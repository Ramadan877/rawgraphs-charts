export const visualOptions = {
    //artboard
    title : {
        type: "text",
        label: "Chart title",
        default: "",
        group: "artboard"
    },

    marginTop: {
        type: 'number',
        label: 'Margin (top)',
        default: 50,
        group: 'artboard',
    },

    marginRight: {
        type: 'number',
        label: 'Margin (right)',
        default: 50,
        group: 'artboard',
    },

    marginBottom: {
        type: 'number',
        label: 'Margin (bottom)',
        default: 50,
        group: 'artboard',
    },

    marginLeft: {
        type: 'number',
        label: 'Margin (left)',
        default: 50,
        group: 'artboard',
    },

    //chart
    dotsRadius: {
        type: 'number',
        label: 'Dots radius',
        default: 5,
        group: 'chart',
    },

    //color
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
