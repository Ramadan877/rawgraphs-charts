export const visualOptions = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 20,
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
    default: 20,
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

  setsPadding: {
    type: 'number',
    label: 'Padding between sets (px)',
    default: 4,
    group: 'chart',
  },

  barsPadding: {
    type: 'number',
    label: 'Padding between bars in the same set (px)',
    default: 1,
    group: 'chart',
  },

  SortXAxisBy: {
    type: 'text',
    label: 'Sort X axis by',
    group: 'chart',
    options: [
      'Total value (descending)',
      'Total value (ascending)',
      'Name',
      'Original',
    ],
    default: 'Name',
  },

  useSameScale: {
    type: 'boolean',
    label: 'Use same scale',
    default: true,
    group: 'series',
  },

  columnsNumber: {
    type: 'number',
    label: 'Number of columns',
    default: 0,
    group: 'series',
  },

  sortSeriesBy: {
    type: 'text',
    label: 'Sort series by',
    group: 'series',
    options: [
      { label: 'Total value (descending)', value: 'valueDescending' },
      { label: 'Total value (ascending)', value: 'valueAscending' },
      { label: 'Name', value: 'name' },
      { label: 'Original', value: 'none' },
    ],
    default: 'valueDescending',
  },

  showSeriesLabels: {
    type: 'boolean',
    label: 'Show series titles',
    default: true,
    group: 'series',
  },

  showGrid: {
    type: 'boolean',
    label: 'Show series grid',
    default: true,
    group: 'series',
  },

  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    dimension: 'bars',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral',
    },
    group: 'colors',
  },
}
