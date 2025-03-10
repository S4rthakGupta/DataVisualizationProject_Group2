const svgScatter = d3.select("#scatterPlot").append("svg").attr("width", 600).attr("height", 400);
const gScatter = svgScatter.append("g").attr("transform", "translate(50,50)");

d3.json("data/teams.json").then(data => {
  const x = d3.scaleLinear().domain([0, d3.max(data, d => d.wins)]).range([0, 500]);
  const y = d3.scaleLinear().domain([0, d3.max(data, d => d.goals)]).range([300, 0]);

  gScatter.selectAll("circle").data(data).enter().append("circle")
    .attr("cx", d => x(d.wins)).attr("cy", d => y(d.goals)).attr("r", 5).attr("fill", "purple")
    .on("mouseover", (event, d) => alert(`Team: ${d.team}\nWins: ${d.wins}, Goals: ${d.goals}`));

  gScatter.append("g").attr("transform", "translate(0,300)").call(d3.axisBottom(x));
  gScatter.append("g").call(d3.axisLeft(y));
});
