const svgBar = d3.select("#barChart").append("svg").attr("width", 600).attr("height", 400);
const marginBar = {top: 20, right: 30, bottom: 40, left: 40};
const widthBar = 600 - marginBar.left - marginBar.right;
const heightBar = 400 - marginBar.top - marginBar.bottom;
const gBar = svgBar.append("g").attr("transform", `translate(${marginBar.left},${marginBar.top})`);

d3.json("data/teams.json").then(data => {
  const x = d3.scaleBand().domain(data.map(d => d.team)).range([0, widthBar]).padding(0.2);
  const y = d3.scaleLinear().domain([0, d3.max(data, d => d.goals)]).range([heightBar, 0]);

  gBar.append("g").attr("transform", `translate(0,${heightBar})`).call(d3.axisBottom(x));
  gBar.append("g").call(d3.axisLeft(y));

  gBar.selectAll(".bar").data(data).enter().append("rect")
    .attr("x", d => x(d.team)).attr("y", d => y(d.goals)).attr("width", x.bandwidth()).attr("height", d => heightBar - y(d.goals))
    .attr("fill", "steelblue").on("mouseover", (event, d) => alert(`Goals: ${d.goals}`));
});
