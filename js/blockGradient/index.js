const blockGradientFromColors = (firstColor, secondColor, steps) => {
    if (firstColor.length !== 3 || secondColor.length !== 3) {
        throw new Error('Invalid parameter format. Expected array with rgb values.')
    }

    if (steps <= 0) {
        throw new Error('Amount of steps must be positive')
    }

    const colorSteps = calculateGradientSteps(firstColor, secondColor, steps)
    const stepsAsBlocks = []

    for (const step of colorSteps) {
        const stepBlock = mostSimilarBlock(step)
        stepsAsBlocks.push(stepBlock)
    }

    return stepsAsBlocks
}