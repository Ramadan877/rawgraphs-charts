/*
Chord Diagram mainly based on the documents by Mike Bostrock: 
https://observablehq.com/@d3/chord-diagram
https://observablehq.com/@d3/chord-dependency-diagram

And on the document from Yan Holtz:
https://d3-graph-gallery.com/graph/chord_axis_labels.html

The Porting of the Chord Diagram to RawGraps2.0 is based on the implementation of the Arc Diagram:
https://github.com/rawgraphs/rawgraphs-charts/tree/master/src/arcdiagram

and on the official instructions for adding a new card;
https://github.com/rawgraphs/rawgraphs-charts/blob/master/docs/add-a-new-chart.md
*/

import * as d3 from 'd3'

export function render(svgNode, data, visualOptions, mapping, originalData) {
  const {
    // artboard
    width,
    height,
    background,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    //chart
    ringWidth,
    ringPadding,
    colorRing,
    colorChords,
    showChordGroupLabels,
  } = visualOptions

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  }

  const { names, matrix } = matrixFromData(data);
  const colors = Array(names.length).fill(colorChords); // TODO

  const innerWidth = width - marginLeft - marginRight;
  const innerHeight = height - marginTop - marginBottom;

  const diameter = Math.min(innerWidth, innerHeight);
  const radius = diameter / 2;

  const translationX = innerWidth / 2 + marginLeft;
  const translationY = innerHeight / 2 + marginTop;

  const svg = d3.select(svgNode)
      .append('g')
      .attr('transform', 'translate(${translationX},${translationY})')
      .attr('id', 'viz');

  const outerRadius = radius;
  const innerRadius = outerRadius - ringWidth;

  const chords = createChords(matrix, innerRadius);

  drawRing(svg, chords, colorRing, innerRadius, outerRadius);
  drawChords(svg, chords, colors, innerRadius);
  if (showChordGroupLabels)
  {
    drawGroupLabels(svg, chords, names, outerRadius);
  }

  function matrixFromData(data) {

    let names = Array.from(new Set(data.flatMap(entry => [entry.source, entry.target])));
    const numberOfNodes = names.length;

    const matrix = Array(numberOfNodes);
    for (let row = 0; row < numberOfNodes; row++) {
      matrix[row] = Array(numberOfNodes).fill(0);
    }

    for (let entry of data) {
      const sourceIndex = names.indexOf(entry.source);
      const targetIndex = names.indexOf(entry.target);
      const value = entry.value;
      matrix[sourceIndex][targetIndex] = value;
    }

    return { names, matrix };
  }

  function createChordDiagram() {

    const innerWidth = width - marginLeft - marginRight;
    const innerHeight = height - marginTop - marginBottom;

    const diameter = Math.min(innerWidth, innerHeight);
    const radius = diameter / 2;

    const translationX = innerWidth / 2 + marginLeft;
    const translationY = innerHeight / 2 + marginTop;

    return d3.select(svgNode)
      .append('g')
      .attr('transform', 'translate(${translationX},${translationY})')
      .attr('id', 'viz');
  }

  function createChords(matrix, innerRadius) {
    return d3.chord()
      .padAngle(ringPadding / innerRadius)
      .sortSubgroups(d3.descending)
      .sortChords(d3.descending)
      (matrix);
  }

  function drawRing(svg, chords, color, innerRadius, outerRadius) {

    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    svg.append("g")
      .selectAll("g")
      .data(chords.groups)
      .join("g")
      .append("path")
      .attr("fill", (d) => color)
      .attr("d", arc)
  }

  function drawChords(svg, chords, colors, innerRadius) {

    const ribbon = d3.ribbon()
      .sourceRadius(() => innerRadius)
      .targetRadius(() => innerRadius - 50)

    svg.append("g")
      .attr("fill-opacity", 0.7)
      .selectAll("path")
      .data(chords)
      .join("path")
      .attr("fill", d => colors[d.source.index])
      .attr("d", ribbon);
  }

  function drawGroupLabels(svg, chords, names, radius) {

    const labels = svg.append("g")
      .attr("font-size", 13)
      .attr("font-family", "sans-serif")
      .selectAll("g")
      .data(chords.groups)
      .join("g");

    const groupLabels = labels.append("g")
      .selectAll("g")
      .data(d => [{ value: d.value, angle: d.startAngle }])
      .join("g")
      .attr("transform", d => `rotate(${d.angle * 180 / Math.PI - 90}) translate(${radius},0)`)
      .append("text")
      .attr("x", 8)
      .attr("dy", d => d.angle > Math.PI ? "-0.2em" : "0.8em")
      .attr("transform", d => d.angle > Math.PI ? "rotate(180) translate(-16)" : null)
      .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)

    labels.select("text")
      .attr("font-weight", "bold")
      .text(function (d) {
        return this.getAttribute("text-anchor") === "end"
          ? `↑ ${names[d.index]}`
          : `${names[d.index]} ↓`;
      });
  }
}