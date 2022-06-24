export const dimensions = [
  {
    id: 'classification',
    name: 'Classification',
    validTypes: ['string', 'number'],
    required: false,
  },

  {
    id: 'dimensions',
    name: 'Dimensions',
    validTypes: ['number'],
    required: true,
    multiple: true,
    operation: 'get',
  }
]
