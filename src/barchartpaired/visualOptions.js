export const visualOptions = {
    //label
    title : {
        type: "string",
        label: "Chart title",
        default: "",
        group: "label"
    },

    labelLeftRotation : {
        type: "number",
        label: "Left label rotation",
        default: 0,
        group: "label"
    },

    labelLeftAlignment : {
        type: "text",
        label: 'Sort bars by',
        group: 'label',
        options: [
            { label: 'Left', value: 'start' },
            { label: 'Middle', value: 'middle' },
            { label: 'Right', value: 'end' },
        ],
        default: 'middle',
    },

    labelRightRotation : {
        type: "number",
        label: "Left label rotation",
        default: 0,
        group: "label"
    },

    labelRightAlignment : {
        type: "text",
        label: 'Sort bars by',
        group: 'label',
        options: [
            { label: 'Left', value: 'start' },
            { label: 'Middle', value: 'middle' },
            { label: 'Right', value: 'end' },
        ],
        default: 'middle',
    },

    //artboard
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
    spaceCommonAxis: {
        type: 'number',
        label: 'Space for common axis',
        default: 100,
        group: 'chart',
    },

    padding: {
        type: 'number',
        label: 'Padding',
        default: 1,
        group: 'chart',
    },

    sortBarsBy: {
        type: 'text',
        label: 'Sort bars by',
        group: 'chart',
        options: [
            { label: 'Size (descending)', value: 'totalDescending' },
            { label: 'Size (ascending)', value: 'totalAscending' },
            { label: 'Name', value: 'name' },
            { label: 'Original', value: 'original' },
        ],
        default: 'name',
    },

    // colorScale: { TODO
    //     type: 'colorScale',
    //     label: 'Color scale',
    //     dimension: 'color',
    //     default: {
    //         scaleType: 'ordinal',
    //         interpolator: 'interpolateSpectral',
    //     },
    //     group: 'color',
    // },
}
