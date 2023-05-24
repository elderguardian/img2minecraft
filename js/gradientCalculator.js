
const calculateGradientSteps = (firstColor, secondColor, steps) => {
    if (firstColor.length !== 3 || secondColor.length !== 3) {
        throw new Error('Invalid parameter format. Expected arrays with rgb values.')
    }

    let alpha = 0, gradientSteps = []

    for (let i = 0; i < steps; i++) {
        alpha += 1.0 / steps;

        const currentStepRgb = [
            Math.round(secondColor[0] * alpha + (1 - alpha) * firstColor[0]),
            Math.round(secondColor[1] * alpha + (1 - alpha) * firstColor[1]),
            Math.round(secondColor[2] * alpha + (1 - alpha) * firstColor[2])
        ]

        gradientSteps.push(currentStepRgb)
    }

    return gradientSteps
}