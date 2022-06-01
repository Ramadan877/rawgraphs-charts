export const visualOptions = {

    title : {
        type: "string",
        label: "Chart title",
        default: "",
        group: "label"
    },

    marginTop: {
        type: 'number',
        label: 'Margin (top)',
        default: 500,
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

    showLegend: {
        type: 'boolean',
        label: 'Show legend',
        default: true,
        group: 'artboard',
    },

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
