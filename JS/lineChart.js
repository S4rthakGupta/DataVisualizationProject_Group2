const svgLine = d3.select("#lineChart").append("svg").attr("width", 600).attr("height", 400);
const marginLine = {top: 20, right: 30, bottom: 30, left: 40};
const widthLine = 600 - marginLine.left - marginLine.right;
const heightLine = 400 - marginLine.top - marginLine.bottom;
const gLine = svgLine.append("g").attr("transform", `translate(${marginLine.left},${marginLine.top})`);

d3.json("data/teams.json").then(data => {
  const x = d3.scaleLinear().domain([1, 5]).range([0, widthLine]);
  const y = d3.scaleLinear().domain([0, d3.max(data, d => d.goals)]).range([heightLine, 0]);

  const line = d3.line().x((d, i) => x(i + 1)).y(d => y(d.goals));
  gLine.append("path").datum(data).attr("fill", "none").attr("stroke", "steelblue").attr("stroke-width", 2).attr("d", line);

  gLine.append("g").attr("transform", `translate(0,${heightLine})`).call(d3.axisBottom(x).ticks(5));
  gLine.append("g").call(d3.axisLeft(y));
});
