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
    padding,
    horizontalBars,
    // series options
    columnsNumber,
    useSameScale,
    sortSeriesBy,
    showSeriesLabels,
    repeatAxesLabels,
    // color options
    colorScale,
    // legend
    showLegend,
    legendWidth,
  } = visualOptions

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  }

  // create nest structure
  const nestedData = d3
    .groups(data, (d) => d.series)
    .map((d) => ({ data: d, totalSize: d3.sum(d[1], (d) => d.size) }))

  // series sorting functions
  const seriesSortings = {
    'Total value (descending)': function (a, b) {
      return d3.descending(a.totalSize, b.totalSize)
    },
    'Total value (ascending)': function (a, b) {
      return d3.ascending(a.totalSize, b.totalSize)
    },
    'Series name': function (a, b) {
      return d3.ascending(a.data[0], b.data[0])
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
    .cols(mapping.series.value ? columnsNumber : 1)

  const griddingData = gridding(nestedData)

  const svg = d3.select(svgNode).append('g').attr('id', 'viz')

  const series = svg
    .selectAll('g')
    .data(griddingData)
    .join('g')
    .attr('id', (d) => d.data[0])
    .attr(
      'transform',
      (d) => 'translate(' + (d.x + margin.left) + ',' + (d.y + margin.top) + ')'
    )

  // domains
  let originalDomain = d3.extent(data, (d) => d.size)
  let sizeDomain =
    originalDomain[0] > 0 ? [0, originalDomain[1]] : originalDomain
  const barsDomain = [...new Set(data.map((d) => d.bars))]

  series.each(function (d, seriesIndex) {
    // make a local selection for each serie
    const selection = d3.select(this)

    // compute each serie width and height
    const seriesWidth = d.width - margin.right - margin.left
    const seriesHeight = d.height - margin.top - margin.bottom

    // scales
    const barScale = d3
      .scaleBand()
      .range([0, horizontalBars ? seriesHeight : seriesWidth])
      .domain(barsDomain)
      .padding(
        padding /
          (horizontalBars ? seriesHeight : seriesWidth / barsDomain.length) //convert padding from px to percentage
      )

    const seriesDomain = d3.extent(d.data[1], (d) => d.size)

    const sizeScale = d3
      .scaleLinear()
      .domain(useSameScale ? sizeDomain : seriesDomain)
      .nice()
      .range(horizontalBars ? [0, seriesWidth] : [seriesHeight, 0])

    const bars = selection
      .append('g')
      .attr('class', 'bars')
      .selectAll('rect')
      .data((d) => d.data[1])
      .join('rect')
      .attr('id', (d) => d.series + ' - ' + d.bars)
      .attr('x', (d) => {
        return horizontalBars
          ? sizeScale(Math.min(0, d.size))
          : barScale(d.bars)
      })
      .attr('y', (d) => {
        return horizontalBars
          ? barScale(d.bars)
          : sizeScale(Math.max(0, d.size))
      })
      .attr('height', (d) => {
        return horizontalBars
          ? barScale.bandwidth()
          : Math.abs(sizeScale(d.size) - sizeScale(0))
      })
      .attr('width', (d) => {
        return horizontalBars
          ? Math.abs(sizeScale(d.size) - sizeScale(0))
          : barScale.bandwidth()
      })
      .attr('fill', (d) => colorScale(d.color))

    if (horizontalBars) {
      const xAxis = selection
        .append('g')
        .attr('id', 'xAxis')
        .attr('transform', 'translate(0,' + seriesHeight + ')')
        .call(d3.axisBottom(sizeScale))
        .call((g) =>
          g
            .append('text')
            .attr('font-family', 'Arial, sans-serif')
            .attr('font-size', 10)
            .attr('x', seriesWidth)
            .attr('dy', -5)
            .attr('fill', 'black')
            .attr('font-weight', 'bold')
            .attr('text-anchor', 'end')
            .attr(
              'display',
              seriesIndex === 0 || repeatAxesLabels ? null : 'none'
            )
            .text((d) => {
              return mapping['size'].value
                ? `${mapping['size'].value} [${mapping.size.config.aggregation}]`
                : ''
            })
        )

      const yAxis = selection
        .append('g')
        .attr('id', 'yAxis')
        .call(d3.axisLeft(barScale).tickSizeOuter(0))
        .call((g) =>
          g
            .append('text')
            .attr('font-family', 'Arial, sans-serif')
            .attr('font-size', 10)
            .attr('x', 4)
            .attr('fill', 'black')
            .attr('font-weight', 'bold')
            .attr('text-anchor', 'start')
            .attr('dominant-baseline', 'hanging')
            .attr(
              'display',
              seriesIndex === 0 || repeatAxesLabels ? null : 'none'
            )

            .text(mapping['bars'].value)
        )
    } else {
      const xAxis = selection
        .append('g')
        .attr('id', 'xAxis')
        .attr('transform', 'translate(0,' + seriesHeight + ')')
        .call(d3.axisBottom(barScale).tickSizeOuter(0))
        .call((g) =>
          g
            .append('text')
            .attr('font-family', 'Arial, sans-serif')
            .attr('font-size', 10)
            .attr('x', seriesWidth)
            .attr('dy', -5)
            .attr('fill', 'black')
            .attr('font-weight', 'bold')
            .attr('text-anchor', 'end')
            .attr(
              'display',
              seriesIndex === 0 || repeatAxesLabels ? null : 'none'
            )
            .text(mapping['bars'].value)
        )

      const yAxis = selection
        .append('g')
        .attr('id', 'yAxis')
        .call(d3.axisLeft(sizeScale))
        .call((g) =>
          g
            .append('text')
            .attr('font-family', 'Arial, sans-serif')
            .attr('font-size', 10)
            .attr('x', 4)
            .attr('fill', 'black')
            .attr('font-weight', 'bold')
            .attr('text-anchor', 'start')
            .attr('dominant-baseline', 'hanging')
            .attr(
              'display',
              seriesIndex === 0 || repeatAxesLabels ? null : 'none'
            )
            .text((d) => {
              return mapping['size'].value
                ? `${mapping['size'].value} [${mapping.size.config.aggregation}]`
                : ''
            })
        )
    }

    if (showSeriesLabels) {
      selection
        .append('text')
        .attr('class', 'title')
        .attr('y', -4)
        .attr('x', seriesWidth / 2)
        .attr('font-family', 'Arial, sans-serif')
        .attr('font-size', 12)
        .attr('fill', 'black')
        .attr('font-weight', 'bold')
        .attr('text-anchor', 'middle')
        .text((d) => d.data[0])
    }
  })

  // add legend
  if (showLegend) {
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
