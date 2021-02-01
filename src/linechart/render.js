import * as d3 from 'd3'
import { legend } from '@raw-temp/rawgraphs-core'
import * as d3Gridding from 'd3-gridding'

export function render(svgNode, data, visualOptions, mapping, originalData) {
  console.log('- render')

  const {
    // artboard options
    width,
    height,
    background,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    // chart options
    interpolation,
    showPoints,
    pointsRadius,
    // series options
    columnsNumber,
    useSameScale = false, // @TODO: add
    sortSeriesBy,
    showSeriesLabels,
    repeatAxesLabels,
    // labels options
    showLabels,
    labelsPosition,
    labelsShorten,
    labelsChars,
    // color options
    colorScale,
    // legend
    showLegend,
    legendWidth,
    // othe non-exposed variables
    serieTitleHeight = 20,
  } = visualOptions

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  }

  // create nest structure
  const nestedData = d3.rollups(
    data,
    (v) => v.sort((a, b) => d3.ascending(a.x, b.x)),
    (d) => d.series,
    (d) => d.lines
  )

  // comupte max values for series
  // will add it as property to each series.

  nestedData.forEach(function (serie) {
    serie.totalValue = data
      .filter((item) => item.series == serie[0])
      .reduce((result, item) => result + item.y, 0)
  })

  // series sorting functions
  const seriesSortings = {
    'Total value (descending)': function (a, b) {
      return d3.descending(a.totalValue, b.totalValue)
    },
    'Total value (ascending)': function (a, b) {
      return d3.ascending(a.totalValue, b.totalValue)
    },
    Name: function (a, b) {
      return d3.ascending(a[0], b[0])
    },
  }
  // sort series
  nestedData.sort(seriesSortings[sortSeriesBy])

  // add background
  d3.select(svgNode)
    .append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('x', 0)
    .attr('y', 0)
    .attr('fill', background)
    .attr('id', 'backgorund')

  // set up grid
  const gridding = d3Gridding
    .gridding()
    .size([width, height])
    .mode('grid')
    .padding(0) // no padding, margins will be applied inside
    .cols(columnsNumber)

  const griddingData = gridding(nestedData)

  const svg = d3.select(svgNode).append('g').attr('id', 'viz')

  // create the clip path
  svg
    .append('clipPath')
    .attr('id', 'serieClipPath')
    .append('rect')
    .attr('x', -margin.left)
    .attr('y', -margin.top)
    .attr('width', griddingData[0].width)
    .attr('height', griddingData[0].height)

  const series = svg
    .selectAll('g')
    .data(griddingData)
    .join('g')
    .attr('id', (d) => d[0])
    .attr(
      'transform',
      (d) => 'translate(' + (d.x + margin.left) + ',' + (d.y + margin.top) + ')'
    )

  mapping.x.dataType === 'number'
    ? (mapping.x.dataType = { type: 'number' })
    : null // @TODO it should be better to have always the same kind of object in mapping

  // convert string to d3 functions
  const curveType = {
    Basis: d3.curveBasis,
    Bundle: d3.curveBundle,
    Cardinal: d3.curveCardinal,
    'Catmull–Rom': d3.curveCatmullRom,
    Linear: d3.curveLinear,
    'Monotone X': d3.curveMonotoneX,
    Natural: d3.curveNatural,
    Step: d3.curveStep,
    'Step After': d3.curveStepAfter,
    'Step Before': d3.curveStepBefore,
  }

  // now add everything to each series

  series.each(function (d, serieIndex) {
    // load the single selection
    const selection = d3.select(this)
    // add the clip path
    // clip-path: url(#clipPath);
    selection.attr('clip-path', 'url(#serieClipPath)')

    // compute each serie width and height
    const serieWidth = d.width - margin.right - margin.left
    const serieHeight = d.height - margin.top - margin.bottom

    // get domains
    const xDomain = d3.extent(data, (e) => e.x)
    const yDomain = useSameScale
      ? // compute extent of the whole dataset
        d3.extent(data, (e) => e.y)
      : // compute extent of the single serie
        d3.extent(d[1].map((e) => e[1]).flat(2), (e) => e.y)

    // define the x scale
    let xScale

    switch (mapping.x.dataType.type) {
      case 'number':
        xScale = d3.scaleLinear().domain(xDomain).nice().range([0, serieWidth])
        break
      case 'date':
        xScale = d3.scaleTime().domain(xDomain).nice().range([0, serieWidth])
        break
    }

    // define the y scale
    const yScale = d3
      .scaleLinear()
      .domain(yDomain)
      .nice()
      .range([serieHeight, 0])

    // define the line path function
    const line = d3
      .line()
      .x(function (d) {
        return xScale(d.x)
      })
      .y(function (d) {
        return yScale(d.y)
      })
      .curve(curveType[interpolation])

    console.log(yDomain)

    // add x axis
    const xAxis = selection
      .append('g')
      .attr('id', 'xAxis')
      .attr(
        'transform',
        (d) =>
          'translate(0,' + (yDomain[0] >= 0 ? serieHeight : yScale(0)) + ')'
      )
      .call(d3.axisBottom(xScale).tickSizeOuter(0))

    // add y axis
    const yAxis = selection
      .append('g')
      .attr('id', 'yAxis')
      .attr(
        'transform',
        (d) => 'translate(' + (xDomain[0] >= 0 ? 0 : xScale(0)) + ',0)'
      )
      .call(d3.axisLeft(yScale).tickSizeOuter(0))

    // create a group for each line.
    // the group will contain the line and the dots.

    const groups = selection
      .append('g')
      .attr('id', 'viz')
      .selectAll('g')
      .data((d) => d[1]) // pass the single line
      .join('g')
      .attr('id', (d) => d[0])

    groups
      .append('path')
      .attr('d', (d) => line(d[1]))
      .attr('stroke', (d) => colorScale(d[1][0].color))
      .attr('fill', 'none')

    if (showPoints) {
      groups
        .append('g')
        .selectAll('circle')
        .data((d) => d[1])
        .join('circle')
        .attr('class', 'dot')
        .attr('cx', (d) => xScale(d.x))
        .attr('cy', (d) => yScale(d.y))
        .attr('r', pointsRadius)
        .attr('fill', (d) => colorScale(d.color))
    }

    // add lines labels
    if (showLabels) {
      let labels = groups
        .append('text')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 10)
        .attr('class', 'labels')
        .text((d) => d[0])

      if (labelsPosition == 'side') {
        labels
          .attr('x', (d) => xScale(d[1].slice(-1)[0].x)) // get last x
          .attr('y', (d) => yScale(d[1].slice(-1)[0].y)) // get last y
          .attr('dx', 5)
          .attr('dy', 4)
          .attr('text-anchor', 'start')
      } else if (labelsPosition == 'inline') {
        labels
          .attr('x', (d) => {
            const maxPos = d3.greatest(d[1], (e) => e.y)
            return xScale(maxPos.x)
          })
          .attr('y', (d) => {
            const maxPos = d3.greatest(d[1], (e) => e.y)
            return yScale(maxPos.y)
          })
          .attr('dx', 0)
          .attr('dy', -4)
          .attr('text-anchor', 'middle')
      }
    }

    // add series titles
    if (showSeriesLabels) {
      selection
        .append('text')
        .attr('y', -4)
        .attr('font-family', 'sans-serif')
        .attr('font-size', 12)
        .attr('font-weight', 'bold')
        .attr('class', 'title')
        .text((d) => d[0])
    }

    // add the x axis titles
    selection
      .append('text')
      .attr('dy', serieHeight - 4)
      .attr('x', serieWidth)
      .attr('class', 'axisTitle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 12)
      .attr('font-style', 'italic')
      .attr('text-anchor', 'end')
      .attr('display', serieIndex == 0 || repeatAxesLabels ? null : 'none')
      .text(mapping.x.value)

    // add the y axis titles
    selection
      .append('text')
      .attr('y', 0)
      .attr('x', 4)
      .attr('dominant-baseline', 'hanging')
      .attr('class', 'axisTitle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 12)
      .attr('font-style', 'italic')
      .attr('text-anchor', 'start')
      .attr('display', serieIndex == 0 || repeatAxesLabels ? null : 'none')
      .text(mapping.y.value + ' (' + mapping.y.config.aggregation + ')')
  })

  if (showLegend) {
    // svg width is adjusted automatically because of the "container:height" annotation in legendWidth visual option

    const legendLayer = d3
      .select(svgNode)
      .append('g')
      .attr('id', 'legend')
      .attr('transform', `translate(${width},${marginTop})`)

    const chartLegend = legend().legendWidth(legendWidth)

    if (mapping.color.value) {
      chartLegend.addColor(mapping.color.value, colorScale)
    }

    legendLayer.call(chartLegend)
  }
}
