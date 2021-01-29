export const visualOptions = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 10,
    group: 'artboard',
  },

  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 10,
    group: 'artboard',
  },

  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 30,
    group: 'artboard',
  },

  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 40,
    group: 'artboard',
  },

  padding: {
    type: 'number',
    label: 'Padding between shapes',
    default: 10,
    group: 'chart',
  },

  binsNumber: {
    type: 'number',
    label: 'Shape resolution', //amount of bins used to compute the histogram
    default: 10,
    group: 'chart',
  },

  interpolation: {
    type: 'text',
    label: 'curve type',
    default: 'Linear',
    options: [
      'Basis',
      'Bundle',
      'Cardinal',
      'Catmull–Rom',
      'Linear',
      'Monotone Y',
      'Natural',
      'Step',
      'Step After',
      'Step Before',
    ],
    group: 'chart',
  },

  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard',
  },

  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 200,
    group: 'artboard',
    disabled: {
      showLegend: false,
    },
    container: 'width',
    containerCondition: {
      showLegend: true,
    },
  },

  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'color',
    default: {
      scaleType: 'ordinal',
      interpolator: 'schemeCategory10',
    },
    group: 'colors',
  },
}