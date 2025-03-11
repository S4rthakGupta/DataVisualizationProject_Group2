const winsData = [
    { country: "Brazil", wins: 5, lat: -14.2350, lon: -51.9253 },
    { country: "Argentina", wins: 3, lat: -38.4161, lon: -63.6167 },
    { country: "France", wins: 2, lat: 46.2276, lon: 2.2137 },
    { country: "Germany", wins: 4, lat: 51.1657, lon: 10.4515 },
    { country: "Spain", wins: 1, lat: 40.4637, lon: -3.7492 },
    { country: "Italy", wins: 4, lat: 41.8719, lon: 12.5674 },
    { country: "Portugal", wins: 1, lat: 39.3999, lon: -8.2245 },
    { country: "England", wins: 1, lat: 52.3555, lon: -1.1743 },
    { country: "Belgium", wins: 0, lat: 50.5039, lon: 4.4699 },
    { country: "Netherlands", wins: 0, lat: 52.1326, lon: 5.2913 }
];

const svgBubble = d3.select("#winsBubbleMap"),
    width = +svgBubble.attr("width"),
    height = +svgBubble.attr("height");

const projection = d3.geoMercator()
    .center([0, 20])
    .scale(150)
    .translate([width / 2, height / 1.5]);

const path = d3.geoPath().projection(projection);

const colorBubble = d3.scaleSequential(d3.interpolateBlues)
    .domain([0, d3.max(winsData, d => d.wins)]);

const size = d3.scaleSqrt()
    .domain([0, d3.max(winsData, d => d.wins)])
    .range([0, 40]);

// ✅ Load from local file
d3.json("data/world.geojson").then(function(world) {
    console.log("GeoJSON loaded", world); // See if this prints in console

    svgBubble.append("g")
        .selectAll("path")
        .data(world.features)
        .enter().append("path")
        .attr("fill", "#e0e0e0")
        .attr("stroke", "#fff")
        .attr("d", path);

    const tooltip = d3.select("body").append("div")
        .style("position", "absolute")
        .style("background", "white")
        .style("padding", "6px 12px")
        .style("border-radius", "4px")
        .style("box-shadow", "0 0 10px rgba(0,0,0,0.1)")
        .style("opacity", 0);

    svgBubble.selectAll("circle")
        .data(winsData)
        .enter().append("circle")
        .attr("cx", d => projection([d.lon, d.lat])[0])
        .attr("cy", d => projection([d.lon, d.lat])[1])
        .attr("r", d => size(d.wins))
        .attr("fill", d => colorBubble(d.wins)) // Use new color name
        .attr("stroke", "#333")
        .attr("stroke-width", 1)
        .attr("opacity", 0.85)
        .on("mouseover", function (event, d) {
            tooltip.transition().duration(200).style("opacity", 0.9);
            tooltip.html(`<strong>${d.country}</strong><br>Wins: ${d.wins}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function () {
            tooltip.transition().duration(500).style("opacity", 0);
        });
}).catch(function (error) {
    console.error("Failed to load GeoJSON:", error); // Print error if not loaded
});
