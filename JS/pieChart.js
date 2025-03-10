const svgPie = d3.select("#pieChart").append("svg").attr("width", 400).attr("height", 400);
const gPie = svgPie.append("g").attr("transform", "translate(200,200)");
const color = d3.scaleOrdinal(d3.schemeSet2);
const pie = d3.pie().value(d => d.wins);
const arc = d3.arc().innerRadius(50).outerRadius(150);

d3.json("data/teams.json").then(data => {
  gPie.selectAll("path").data(pie(data)).enter().append("path")
    .attr("d", arc).attr("fill", d => color(d.data.team))
    .on("click", (event, d) => alert(`${d.data.team}: ${d.data.wins} wins`));
});
