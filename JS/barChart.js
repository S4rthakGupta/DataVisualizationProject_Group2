const svgBar = d3.select("#barChart").append("svg")
    .attr("width", 600)
    .attr("height", 400);

const marginBar = { top: 40, right: 30, bottom: 60, left: 60 };
const widthBar = 600 - marginBar.left - marginBar.right;
const heightBar = 400 - marginBar.top - marginBar.bottom;

const gBar = svgBar.append("g").attr("transform", `translate(${marginBar.left},${marginBar.top})`);

const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

d3.json("data/teams.json").then(data => {
    const x = d3.scaleBand()
        .domain(data.map(d => d.team))
        .range([0, widthBar])
        .padding(0.2);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.goals)])
        .range([heightBar, 0]);

    gBar.append("g")
        .attr("transform", `translate(0,${heightBar})`)
        .call(d3.axisBottom(x));

    gBar.append("g")
        .call(d3.axisLeft(y));

    // Axis Labels
    svgBar.append("text")
        .attr("x", widthBar / 2 + marginBar.left)
        .attr("y", 390)
        .attr("text-anchor", "middle")
        .text("Teams");

    svgBar.append("text")
        .attr("x", -heightBar / 2 - marginBar.top)
        .attr("y", 15)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .text("Goals");

    // Bars
    gBar.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("x", d => x(d.team))
        .attr("y", d => y(d.goals))
        .attr("width", x.bandwidth())
        .attr("height", d => heightBar - y(d.goals))
        .attr("fill", "steelblue")
        .on("mouseover", (event, d) => {
            tooltip.transition().duration(200).style("opacity", .9);
            tooltip.html(`Team: ${d.team}<br>Goals: ${d.goals}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", () => tooltip.transition().duration(500).style("opacity", 0));
});
