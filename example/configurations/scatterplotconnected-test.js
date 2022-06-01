import data from '../datasets/Movies.tsv'
import chart from 'rawcharts/scatterplotconnected'

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
        x: { value: ['Budget (Millions, adjusted for inflation)'] },
        y: { value: ['Box Office (Millions, adjusted for inflation)'] },
        color: { value: ['Genre'] },
    },
    visualOptions: {
        width: 800,
        height: 600,
        background: 'white',
        dotsRadius: 10,
        title: "Movie Box Office vs Movie Budget (in Millions)"
    },
}
