export const visualOptions = {

  marginTop : {
    type: 'number',
    label: 'Margin (top)',
    default: 10,
    group: 'artboard',
  },

  marginRight : {
    type: 'number',
    label: 'Margin (right)',
    default: 10,
    group: 'artboard',
  },

  marginBottom : {
    type: 'number',
    label: 'Margin (bottom)',
    default: 10,
    group: 'artboard',
  },

  marginLeft : {
    type: 'number',
    label: 'Margin (left)',
    default: 10,
    group: 'artboard',
  },

	nodesWidth: {
    type: "number",
    label: "Nodes width",
    default: 5,
    group: "chart",
  },

  alignments: {
    type: "text",
    label: "Nodes alignment",
    group: "chart",
    options: ["Left", "Right", "Center", "Justify"],
    default: "Left"
  }

}
