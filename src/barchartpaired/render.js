import * as d3 from 'd3'
import { legend } from '@rawgraphs/rawgraphs-core'
import '../d3-styles.js'

export function render(node, data, visualOptions, mapping, styles) {
  // destructurate visual visualOptions
  const {
    width,
    height,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    title,
    background,
    spaceCommonAxis,
    sortBarsBy,
    padding,
    labelLeftAlignment,
    labelLeftRotation
  } = visualOptions

  const minTitleHeight = 300
  const titleSize = height / 30

  let boundWidth = width - marginLeft - marginRight
  let boundWidthOneChart = boundWidth - spaceCommonAxis
  let boundHeight = height - marginTop - marginBottom
  let boundLeft = marginLeft
  let boundTop =  boundHeight >= minTitleHeight ? marginTop + titleSize : marginTop

  if (boundHeight >= minTitleHeight) {
    boundHeight -= titleSize
  }

  const x1Accessor = d => d.x1
  const x2Accessor = d => d.x2
  const yAccessor = d => d.y

  const barsSortings = {
    totalDescending: (a, b) => d3.descending(a[1], b[1]),
    totalAscending: (a, b) => d3.ascending(a[1], b[1]),
    name: (a, b) => d3.ascending(a[0], b[0]),
    original: (a, b) => true,
  }

  const barsDomain = d3
      .rollups(
          data,
          (v) => d3.sum(v, (d) => d.size),
          (d) => d.y
      )
      .sort(barsSortings[sortBarsBy])
      .map((d) => d[0])


  const svg = d3.select(node)

  svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', background)

  if (titleSize) {
    svg.append('text')
        .text(title)
        .attr('x', width / 2)
        .attr('y', marginTop)
        .style("text-anchor", "middle")
        .attr("font-size", titleSize)
  }

  const bounds = svg.append("g")
      .attr("transform", `translate(
      ${boundLeft},
      ${boundTop})`)


  let x1Scale = d3
      .scaleLinear()
      .domain(d3.extent(data, x1Accessor))
      .range([0, (boundWidthOneChart) / 2])
      .nice()

  let x2Scale = d3
      .scaleLinear()
      .domain(d3.extent(data, x2Accessor))
      .range([0, boundWidthOneChart / 2])
      .nice()

  let x2ScaleReverse = d3
      .scaleLinear()
      .domain(d3.extent(data, x2Accessor))
      .range([boundWidth, (boundWidth + spaceCommonAxis) / 2])
      .nice()

  let yScale = d3
      .scaleBand()
      .domain(barsDomain)
      .range([0, boundHeight])
      .padding(padding / (boundHeight / barsDomain.length))

  const yAxisGenerator = d3.axisLeft()
      .scale(yScale)
  const yAxis = bounds.append("g")
      .call(yAxisGenerator)
      .attr("text-anchor", "middle")
  yAxis.attr("transform", `translate(${
      (boundWidth + yAxis._groups[0][0].getBBox().width) / 2 
  }, 0)`)

  yAxis.select("path")
      .attr("stroke", "none")
  yAxis.selectAll("line")
      .attr("stroke", "none")

  const x1AxisGenerator = d3.axisBottom()
      .scale(x1Scale)
  const x1Axis = bounds.append("g")
      .call(x1AxisGenerator)
      .attr("transform",
          `translate(${(boundWidth + spaceCommonAxis)  / 2}, ${boundHeight})`)

  const x2AxisGenerator = d3.axisBottom()
      .scale(x2ScaleReverse)
  const x2Axis = bounds.append("g")
      .call(x2AxisGenerator)
      .attr("transform",
          `translate(${-(boundWidth + spaceCommonAxis) / 2}, ${boundHeight})`)

  x2Axis.selectAll("text")
      .attr("text-anchor", labelLeftAlignment)
      .attr("transform", `rotate(${labelLeftRotation})`)


  const bars1 = bounds
      .append('g')
      .attr('id', 'bars1')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (boundWidth + spaceCommonAxis)  / 2)
      .attr('y', (d) => yScale(yAccessor(d)))
      .attr('height', yScale.bandwidth())
      .attr('width', (d) => x1Scale(x1Accessor(d)))
      .attr('fill', "#3333ff")
      // .attr('fill', (d) => colorScale(d.x1))

  const bars2 = bounds
      .append('g')
      .attr('id', 'bars2')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', d => boundWidthOneChart / 2  - x2Scale(x2Accessor(d)))
      .attr('y', (d) => yScale(yAccessor(d)))
      .attr('height', yScale.bandwidth())
      .attr('width', (d) => x2Scale(x2Accessor(d)))
      .attr('fill', "#ff5555")
      // .attr('fill', (d) => colorScale(d.x2))

}
