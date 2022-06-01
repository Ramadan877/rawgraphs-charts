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
    background
  } = visualOptions

  const minTitleHeight = 300
  const titleSize = height / 30

  let boundWidth = width - marginLeft - marginRight
  let boundHeight = height - marginTop - marginBottom
  let boundLeft = marginLeft
  let boundTop =  boundHeight >= minTitleHeight ? marginTop + titleSize : marginTop

  if (boundHeight >= minTitleHeight) {
    boundHeight -= titleSize
  }

  const x1Accessor = d => d.x1
   const x2Accessor = d => d.x2
  const yAccessor = d => d.y


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
      .style("transform", `translate(
      ${boundLeft}px,
      ${boundTop}px)`)


  let x1Scale = d3
      .scaleLinear()
      .domain(d3.extent(data, x1Accessor))
      .range([0, boundWidth / 2])
      .nice()

  let x2Scale = d3
      .scaleLinear()
      .domain(d3.extent(data, x2Accessor))
      .range([boundWidth, boundWidth / 2])
      .nice()

  let yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, yAccessor))
      .range([0, boundHeight])
      .nice()


  const yAxisGenerator = d3.axisLeft()
      .scale(yScale)
  const yAxis = bounds.append("g")
      .call(yAxisGenerator)
      .style("transform", `translateX(${
          boundWidth / 2
      }px)`)

  const x1AxisGenerator = d3.axisBottom()
      .scale(x1Scale)
  const x1Axis = bounds.append("g")
      .call(x1AxisGenerator)
      .style("transform",
          `translate(${boundWidth / 2}px, ${boundHeight}px)`)

  const x2AxisGenerator = d3.axisBottom()
      .scale(x2Scale)
  const x2Axis = bounds.append("g")
      .call(x2AxisGenerator)
      .style("transform",
          `translate(${-boundWidth / 2}px, ${boundHeight}px)`)


}
