import * as d3 from 'd3'
import {allTSNEE} from "../tsne"
import '../d3-styles.js'

export function render(node, data, visualOptions, mapping) {
  // destructurate visual visualOptions
  const {
    // default options
    width,
    height,
    marginLeft,
    marginRight,
    marginBottom,
    marginTop,
    background,
    dotsRadius,
    colorScale,
    title,
    epsilon,
    perplexity,
  } = visualOptions

  const {
    titleSize,
    boundWidth,
    boundHeight,
    boundLeft,
    boundTop,
    xAccessor,
    yAccessor,
    reducedDimensions
  } = calcProps()
  const xDimension = reducedDimensions.map(point => point[0])
  const yDimension = reducedDimensions.map(point => point[1])

  const svg = d3.select(node)
  const bounds = createBounds()
  const {xScale, yScale} = createScales()
  const {xAxis, yAxis} = createAxes()
  const {dots} = drawScatterPoints()

  function calcProps() {
    const minTitleHeight = 300
    const titleSize = height / 30

    let boundWidth = width - marginLeft - marginRight
    let boundHeight = height - marginTop - marginBottom
    let boundLeft = marginLeft
    let boundTop =  boundHeight >= minTitleHeight ? marginTop + titleSize : marginTop

    if (boundHeight >= minTitleHeight) {
      boundHeight -= titleSize
    }

    const xAccessor = d => d[0]
    const yAccessor = d => d[1]

    const reducedDimensions = calcReducedDimensions()

    return {minTitleHeight, titleSize, boundWidth, boundHeight, boundLeft, boundTop,
      xAccessor, yAccessor, reducedDimensions}
  }

  function calcReducedDimensions() {
    const opt = {dim : 2, epsilon, perplexity}
    var tsne =  allTSNEE(opt)
    const tsneData = data.map(row => {
      return row.dimensions
    })

    tsne.initDataRaw(tsneData)

    for(var k = 0; k < 500; k++) {
      tsne.step(); // every time you call this, solution gets better
    }

    return tsne.getSolution(); // Y is an array of 2-D points that you can plot
  }

  function createBounds() {
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

    return svg.append("g")
        .attr("transform", `translate(
      ${boundLeft},
      ${boundTop})`)
  }

  function createScales() {
    const xScale = d3
        .scaleLinear()
        .domain(d3.extent(xDimension))
        .range([0, boundWidth])
        .nice()

    const yScale = d3
        .scaleLinear()
        .domain(d3.extent(yDimension))
        .range([boundHeight, 0])

    return {xScale, yScale}
  }

  function createAxes() {
    const yAxisGenerator = d3.axisLeft()
        .scale(yScale)
    const yAxis = bounds.append("g")
        .call(yAxisGenerator)
        .attr("text-anchor", "left")
    yAxis.attr("transform", `translate(${0}, 0)`)

    yAxis.selectAll("text")
        // .attr("text-anchor", labelLeftAlignment) //TODO make good visualization
        .attr("transform", `translate(${40}, 0)`)

    const xAxisGenerator = d3.axisBottom()
        .scale(xScale)
    const xAxis = bounds.append("g")
        .call(xAxisGenerator)
        .attr("transform",
            `translate(${0}, ${boundHeight})`)

    return({xAxis, yAxis})
  }

  function drawScatterPoints() {
        const dots = bounds.selectAll("circle").data(reducedDimensions)
        dots.join("circle")
            .attr("cx", d => xScale(xAccessor(d)))
            .attr("cy", d => yScale(yAccessor(d)))
            .attr("r", 5)
            // .attr("fill", color)
            .attr("fill", "#0365a8")
    return dots
  }
}
