import * as d3 from 'd3'
import * as d3Hexbin from 'd3-hexbin'
import {
  legend,
  dateFormats,
  labelsOcclusion,
  colorPresets,
} from '@raw-temp/rawgraphs-core'
import '../d3-styles.js'

export function render(
  svgNode,
  data,
  visualOptions,
  mapping,
  originalData,
  styles
) {
  const {
    width,
    height,
    background,
    xOrigin,
    yOrigin,
    radius,
    weightSize,
    showPoints,
    pointsRadius,
    showLegend,
    legendWidth,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    colorScale,
  } = visualOptions

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  }

  const chartWidth = width - margin.left - margin.right
  const chartHeight = height - margin.top - margin.bottom

  // x scale
  const xDomain = xOrigin
    ? [0, d3.max(data, (d) => d.x)]
    : d3.extent(data, (d) => d.x)

  const x =
    mapping.x.dataType.type === 'date' ? d3.scaleTime() : d3.scaleLinear()

  x.domain(xDomain).rangeRound([0, chartWidth]).nice()

  // y scale
  const yDomain = yOrigin
    ? [0, d3.max(data, (d) => d.y)]
    : d3.extent(data, (d) => d.y)

  const y =
    mapping.y.dataType.type === 'date' ? d3.scaleTime() : d3.scaleLinear()

  y.domain(yDomain).rangeRound([chartHeight, 0]).nice()

  const xAxis = (g) => {
    return g
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x))
      .call((g) =>
        g
          .append('text')
          .attr('x', chartWidth)
          .attr('dy', -5)
          .attr('text-anchor', 'end')
          .text(mapping['x'].value)
          .styles(styles.axisLabel)
      )
  }

  const yAxis = (g) => {
    return g
      .call(d3.axisLeft(y))
      .call((g) =>
        g
          .append('text')
          .attr('x', 4)
          .attr('text-anchor', 'start')
          .attr('dominant-baseline', 'hanging')
          .text(mapping['y'].value)
          .styles(styles.axisLabel)
      )
  }

  const artboardBackground = d3
    .select(svgNode)
    .append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('x', 0)
    .attr('y', 0)
    .attr('fill', background)
    .attr('id', 'background')

  const svg = d3
    .select(svgNode)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('id', 'visualization')

  const axisLayer = svg.append('g').attr('id', 'axis')

  axisLayer.append('g').call(xAxis)
  axisLayer.append('g').call(yAxis)

  const vizLayer = svg.append('g').attr('id', 'viz')

  const hexbin = d3Hexbin
    .hexbin()
    .x((d) => x(d.x))
    .y((d) => y(d.y))
    .radius(radius)
    .extent([
      [margin.left, margin.top],
      [chartWidth, chartHeight],
    ])

  const bins = hexbin(data)

  let size

  if (weightSize) {
    size = d3
      .scaleSqrt()
      .domain([0, d3.max(bins, (d) => d.length)])
      .rangeRound([0, radius])
  }

  const hex = vizLayer.selectAll('g').data(bins).join('g')

  hex
    .append('path')
    .attr('d', (d) => hexbin.hexagon(weightSize ? size(d.length) : radius))
    .attr('transform', (d) => `translate(${d.x},${d.y})`)
    .attr('fill', (d) => colorScale(d.length))
    .attr('stroke', 'white')

  if (showPoints) {
    hex
      .selectAll('circle')
      .data((d) => d)
      .join('circle')
      .attr('cx', (d) => x(d.x))
      .attr('cy', (d) => y(d.y))
      .attr('fill', 'black')
      .attr('r', pointsRadius)
  }

  // if (showLegend) {
  //   const legendLayer = d3
  //     .select(svgNode)
  //     .append('g')
  //     .attr('id', 'legend')
  //     .attr('transform', `translate(${width},${marginTop})`)

  //   const chartLegend = legend().legendWidth(legendWidth)

  //   if (mapping.color.value) {
  //     chartLegend.addColor(mapping.color.value, colorScale)
  //   }

  //   if (mapping.size.value) {
  //     const legendSizeScale = size.copy()
  //     legendSizeScale
  //       .domain(d3.extent(data, (d) => d.size))
  //       .rangeRound([size(d3.min(data, (d) => d.size)), maxRadius])

  //     chartLegend.addSize(mapping.size.value, legendSizeScale, 'circle')
  //   }

  //   legendLayer.call(chartLegend)
  // }
}