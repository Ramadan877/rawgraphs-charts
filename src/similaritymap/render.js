import * as d3 from 'd3'
import '../d3-styles.js'

export function render(node, data, visualOptions, mapping) {
  // destructurate visual visualOptions
  const {
    // default options
    width,
    height,
    background,
    dotsRadius,
    colorScale
  } = visualOptions

  // select the SVG element
  const svg = d3.select(node)
  svg
      .append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', background)

  let xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.x))
      .rangeRound([0, width])
      .nice()

  let yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.y))
      .rangeRound([height, 0])
      .nice()

  svg
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y))
      .attr('r', dotsRadius)
      .attr('fill', (d) => colorScale(d.color))
}
