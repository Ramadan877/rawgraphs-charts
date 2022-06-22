import icon from './chorddiagram.svg'
import thumbnail from './chorddiagram_thumb.svg'

/*
Copied and adapted from:
https://github.com/rawgraphs/rawgraphs-charts/blob/master/docs/add-a-new-chart.md
*/

export const metadata = {
  name: 'Chord Diagram',
  id: 'rawgraphs.chorddiagram',
  thumbnail,
  icon,
  categories: ['networks'],
  description:
    'A particular kind of network graph, allows seeing relationships among nodes. Nodes are displayed on a circular axis (outer ring), and edges between nodes are represented as chords. Usually, incoming connections are distinguished from outgoing relations using a larger intend or padding.',
  // code:
  //   'https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/arcdiagram',
  // tutorial: 'https://rawgraphs.io/learning/how-to-make-an-arc-diagram/',
}