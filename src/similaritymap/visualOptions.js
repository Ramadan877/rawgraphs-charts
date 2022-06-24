export const visualOptions = {

    dotsRadius: {
        type: 'number',
        label: 'Dots radius',
        default: 5,
        group: 'chart',
    },

    colorScale: {
        type: 'colorScale',
        label: 'Color scale',
        dimension: 'color',
        default: {
            scaleType: 'ordinal',
            interpolator: 'interpolateSpectral',
        },
        group: 'color',
    },
}
