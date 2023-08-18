function addAnnotation(selection, annotation) {
  let markerBoxWidth = 5;
  let markerBoxHeight = 5;
  let refX = markerBoxWidth / 2;
  let refY = markerBoxHeight / 2;
  let arrowPoints = [
    [0, 0],
    [0, markerBoxWidth],
    [markerBoxHeight, markerBoxHeight / 2],
  ];

  let curveFunc = d3
    .line()
    // try curveStep
    .curve(d3.curveBasis)
    .x(function (d) {
      return d.x;
    })
    .y(function (d) {
      return d.y;
    });

  let anno_g = selection.append("g");
  anno_g
    .append("marker")
    .attr("id", "arrow")
    .attr("viewBox", "-10 -10 20 20")
    .attr("markerWidth", 15)
    .attr("markerHeight", 15)
    .attr("refX", -1 * refX)
    .attr("refY", -1 * refY)
    .attr("orient", "auto-start-reverse")
    .append("path")
    .attr("d", "M-6.75, -6.75 L 0, 0 L -6.75, 6.75");

  anno_g
    .append("path")
    .attr("d", curveFunc(annotation.data))
    .attr("stroke", "black")
    .attr("marker-start", "url(#arrow)")
    .attr("fill", "none");

  anno_g
    .append("foreignObject")
    .style("overflow", "visible")
    .attr(
      "x",
      annotation.data[annotation.data.length - 1].x - annotation.width / 2,
    )
    .attr("y", annotation.data[annotation.data.length - 1].y)
    .attr("width", annotation.width)
    .attr("height", annotaion.height)
    .append("xhtml:p")
    .style("margin", "5px 0px 0px 0px")
    .style("text-align", "center")
    .html(annotation.text);
}

module.exports = addAnnotation;
