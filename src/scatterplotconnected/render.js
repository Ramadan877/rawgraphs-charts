import '../d3-styles.js'
import * as d3 from 'd3'
import { legend } from '@rawgraphs/rawgraphs-core'

export function render(node, data, visualOptions, mapping, styles) {
  const minHeight = 300
  const minWidth = 200
  const legendWidth = 150

  const {
    width,
    chartWidth,
    height,
    background,
    dotsRadius,
    colorScale,
    title,
    showLegend
  } = calcVisualOptions(visualOptions)

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
      .rangeRound([0, chartWidth])
      .nice()

  let yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.y))
      .rangeRound([height, 0])
      .nice()

  console.log(xScale)

  svg
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', (d) => {
        console.log(xScale(d.x))
        return xScale(d.x)
      })
      .attr('cy', (d) => yScale(d.y))
      .attr('r', dotsRadius)
      .attr('fill', (d) => colorScale(d.color))


  const legendLayer = svg
      .append('g')
      .attr('id', 'legend')
      .attr('transform', `translate(${width - legendWidth},${50})`)

  // if color is mapped, create the legend
  if (mapping.color.value) {
    // create the legend object
    const chartLegend = legend().legendWidth(150)
    //add color to the legend
    chartLegend.addColor(mapping.color.value, colorScale)
    // render the legend
    legendLayer.call(chartLegend)


    const titleElement = svg
        .append('text')
        .text(title)
        .attr('x', width / 2)
        .attr('y', 20)
        .style("text-anchor", "middle")
        .styles(styles.seriesLabel)
  }

  function calcVisualOptions(visualOptions) {
    const {
      width,
      height,
      background,
      dotsRadius,
      colorScale,
      title,
      showLegend,
    } = visualOptions

    let newHeight = height
    if (newHeight < minHeight)
      newHeight = minHeight

    let newWidth = width
    let chartWidth = width - legendWidth
    let newShowLegend = showLegend
    if (width < minWidth) {
      newWidth = minWidth
    }
    if (width < minWidth + legendWidth) {
      newShowLegend = false
      chartWidth = width
    }


    const calcedProps = {width : newWidth, height : newHeight, showLegend: newShowLegend, chartWidth}


    return {...visualOptions, ...calcedProps}
  }
}
