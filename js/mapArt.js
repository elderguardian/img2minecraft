
const imageToMinecraft = async imageFile => {
    const canvas = await imageOnSmallCanvas(imageFile, 100, 100)
    return generateTable(canvas)
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

const generateTable = canvas => {
    const canvasContext = canvas.getContext('2d')
    const mapTable = document.createElement('table')
    mapTable.setAttribute('cellspacing', '0')
    mapTable.setAttribute('cellpadding', '0')

    for (let row = 0; row < canvas.height; row++) {
        const rowElement = mapTable.insertRow()

        for (let column = 0; column < canvas.width; column++) {
            const cellElement = rowElement.insertCell()
            const rawPixelData= canvasContext.getImageData(column, row, 1, 1).data

            const currentPixel = [
                rawPixelData[0],
                rawPixelData[1],
                rawPixelData[2],
            ]

            const closestBlock = mostSimilarBlock(currentPixel)

            const blockImage = document.createElement('img')
            blockImage.src = `blockdata/images/${closestBlock['id']}`

            cellElement.appendChild(blockImage)
        }

    }

    return mapTable
}