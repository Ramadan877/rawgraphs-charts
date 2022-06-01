import data from '../datasets/Movies.tsv'
import chart from 'rawcharts/barchartpaired'

export default {
    chart,
    data,
    dataTypes: {
        Year: {
            type: 'date',
            dateFormat: 'YYYY',
        },
        'Box Office (Millions, adjusted for inflation)': 'number',
        'Budget (Millions, adjusted for inflation)': 'number',
        Rating: 'number',
        Title: 'string',
        Genre: 'string',
    },
    mapping: {
        x1: { value: ['Budget (Millions, adjusted for inflation)'] },
        x2: { value: ['Box Office (Millions, adjusted for inflation)'] },
        y: { value: ['Rating'] },
        // color: { value: ['Genre'] },
    },
    visualOptions: {
        width: 800,
        height: 600,
        background: 'white',
        title: "COOL PAIRED BAR CHART"
    },
}
