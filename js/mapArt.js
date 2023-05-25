const resizeOnCanvas = async (imageFile, width, height) => {

    //wait for image to load using promise, then put on canvas and resize
    const imageOnCanvas = (imageFile, width, height) =>  new Promise(resolve => {
        const canvas = document.createElement('canvas')
        const image = new Image()
        image.src = window.webkitURL.createObjectURL(imageFile)
        image.onload = () => resolve({ image, canvas })
    })

    const {canvas,image} = await imageOnCanvas(imageFile, width, height)
    canvas.width = width
    canvas.height = height

    const canvasContext = canvas.getContext('2d')
    canvasContext.drawImage(image, 0, 0, canvas.width, canvas.height)

    return canvas
}

const generateTable = canvas => {
    const canvasContext = canvas.getContext('2d')
    const rawColorData = canvasContext.getImageData(0, 0, canvas.width, canvas.height).data
    const mapTable = document.createElement('table')
    mapTable.setAttribute('cellspacing', '0')
    mapTable.setAttribute('cellpadding', '0')

    for (let row = 0; row < canvas.width; row++) {
        const rowElement = mapTable.insertRow()

        for (let column = 0; column < canvas.width; column++) {
            const cellElement = rowElement.insertCell()
            const pixelStart = (canvas.width * 4 * row-1) + ((column-1) * 4)

            const currentPixel = [
                rawColorData[pixelStart],
                rawColorData[pixelStart + 1],
                rawColorData[pixelStart + 2],
            ]

            const closestBlock = mostSimilarBlock(currentPixel)

            const blockImage = document.createElement('img')
            blockImage.src = `blockdata/images/${closestBlock['id']}`

            cellElement.appendChild(blockImage)
        }

    }

    return mapTable
}