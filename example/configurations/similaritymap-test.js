import data from '../datasets/fake-multiset.tsv'
import chart from 'rawcharts/similaritymap'

export default {
    chart,
    data,
    dataTypes: {
        group: 'string',
        Value_1: 'number',
        Value_2: 'number',
        Value_3: 'number',
    },
    mapping: {
        classification: {
            value: ['group']
        },
        dimensions: {
            value: ['Value_1', 'Value_2', 'Value_3'],
        },
    },
    visualOptions: {
        width: 1000,
        height: 700,
        marginTop: 50,
        marginBottom: 50,
        marginRight: 50,
        marginLeft: 50,
    },
}
