export const visualOptions = {
    //label
    title : {
        type: "text",
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
        label: 'Align left labels to:',
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
        label: "Right label rotation",
        default: 0,
        group: "label"
    },

    labelRightAlignment : {
        type: "text",
        label: 'Align right labels to:',
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

    colorScale1: {
        type: 'colorScale',
        label: 'Color left axis',
        dimension: 'x1',
        default: {
            scaleType: 'sequential',
            interpolator: 'interpolateReds',
        },
        group: 'color',
    },

    colorScale2: {
        type: 'colorScale',
        label: 'Color right axis',
        dimension: 'x2',
        default: {
            scaleType: 'sequential',
            interpolator: 'interpolateBlues',
        },
        group: 'color',
    },
}
