/*
Copied and customized from:
https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/arcdiagram/visualOptions.js
*/


export const visualOptions = {
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

  ringWidth: {
    type: 'number',
    label: 'Ring width',
    default: 10,
    group: 'chart',
  },

  ringPadding: {
    type: 'number',
    label: 'Ring padding',
    default: 10,
    group: 'chart',
  },


  /*
  Copied and customized from barchart:
  https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/barchart
  */
  colorRing: {
    type: 'colorScale',
    label: 'Color Ring',
    dimension: 'colorring',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral',
    },
    group: 'colors',
  },

  colorChords: {
    type: 'colorScale',
    label: 'Color Chords',
    dimension: 'colorring',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral',
    },
    group: 'colors',
  },


/*
Copied and customized from linechart:
https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/linechart
*/
showChordGroupLabels: {
  type: 'boolean',
  label: 'Show Chor Group Labels',
  default: true,
  group: 'labels',
},

}