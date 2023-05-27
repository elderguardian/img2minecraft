
const imageToMinecraft = async imageFile => {
    const canvas = await imageOnSmallCanvas(imageFile, 100, 100)
    document.querySelector('body').appendChild(canvas)
    return await canvasToMinecraft(canvas)
}

const scaleImageSize = (width, height, maxWidth, maxHeight) => {
    let newSize = {width, height}
    let ratio = 0

    if (width > maxWidth) {
        ratio = maxWidth / width

        newSize.width = maxWidth
        newSize.height = height * ratio
    }

    if (height > maxHeight) {
        ratio = maxHeight / height

        newSize.height = maxHeight
        newSize.width = width * ratio
    }

    return newSize
}

const imageOnSmallCanvas = async (imageFile, maxWidth, maxHeight) => {

    //wait for image to load using promise, then put on canvas and resize
    const imageOnCanvas = imageFile => new Promise(resolve => {
        const canvas = document.createElement('canvas')
        const image = new Image()
        image.src = window.webkitURL.createObjectURL(imageFile)
        image.onload = () => resolve({image, canvas})
    })

    const {canvas, image} = await imageOnCanvas(imageFile)

    const newImageSize = scaleImageSize(image.width, image.height, maxWidth, maxHeight)
    canvas.width = newImageSize.width
    canvas.height = newImageSize.height

    const canvasContext = canvas.getContext('2d')
    canvasContext.drawImage(image, 0, 0, canvas.width, canvas.height)

    return canvas
}

const canvasToMinecraft = async canvas => {
    const canvasContext = canvas.getContext('2d')

    const resultCanvas = document.createElement('canvas')
    const resultCanvasContext = resultCanvas.getContext('2d')
    //resultCanvasContext.imageSmoothingEnabled = false
    resultCanvas.width = canvas.width * 16
    resultCanvas.height = canvas.height * 16

    const loadedImage = src => new Promise(resolve => {
        const image = new Image()
        image.src = src
        image.onload = () => resolve(image)
    })

    for (let row = 0; row < canvas.width; row++) {
        for (let column = 0; column < canvas.height; column++) {
            const pixelDataRgba = canvasContext.getImageData(row,  column, 1, 1).data
            const pixelDataRgb = pixelDataRgba.subarray(0, 3)

            console.log(`got ${pixelDataRgba}, is now ${pixelDataRgb}`)

            const closestBlock = mostSimilarBlock(pixelDataRgb)
            const blockImage = await loadedImage(`blockdata/images/${closestBlock['id']}`)

            resultCanvasContext.drawImage(blockImage,row*16,column*16,16,16)
        }
    }

    return resultCanvas
}