const rgbColorSimilarity = (one, two) => {
    if (one.length !== 3 || two.length !== 3) {
        throw new Error('Invalid parameter format. Expected array with rgb values.')
    }

    // Formula for euclidean distance
    // d = sqrt( (R2-R1)^2 + (G2-G1)^2 + (B2-B1)^2 )

    let delta = Math.pow(two[0] - one[0], 2)
    delta += Math.pow(two[1] - one[1], 2)
    delta += Math.pow(two[2] - one[2], 2)
    delta = Math.sqrt(delta)

    return delta
}

const mostSimilarBlock = (searchedColor) => {
    let closestBlock = { id: null, similarity: null, }

    for (const block of blockdata) {
        const currentBlockId = block['id']
        const averageBlockColor = block['rgb']
        const similarity = rgbColorSimilarity(searchedColor, averageBlockColor)
        const isNewClosestBlock = closestBlock.id === null || closestBlock.similarity > similarity

        if (isNewClosestBlock) {
            closestBlock.id = currentBlockId
            closestBlock.similarity = similarity
        }
    }

    return closestBlock
}