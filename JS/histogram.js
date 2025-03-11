const dataByYear = {
    "2022": [
        { "team": "Brazil", "goals": 10 },
        { "team": "Argentina", "goals": 8 },
        { "team": "France", "goals": 7 },
        { "team": "Germany", "goals": 5 },
        { "team": "Spain", "goals": 6 },
        { "team": "Italy", "goals": 4 },
        { "team": "Portugal", "goals": 7 },
        { "team": "England", "goals": 5 },
        { "team": "Belgium", "goals": 3 },
        { "team": "Netherlands", "goals": 4 }
    ],
    "2023": [
        { "team": "Brazil", "goals": 12 },
        { "team": "Argentina", "goals": 9 },
        { "team": "France", "goals": 11 },
        { "team": "Germany", "goals": 4 },
        { "team": "Spain", "goals": 8 },
        { "team": "Italy", "goals": 5 },
        { "team": "Portugal", "goals": 10 },
        { "team": "England", "goals": 6 },
        { "team": "Belgium", "goals": 7 },
        { "team": "Netherlands", "goals": 5 }
    ]
};

const svg = d3.select("#histogramChart"),
    margin = { top: 20, right: 30, bottom: 40, left: 50 },
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

const chartGroup = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

const x = d3.scaleBand().range([0, width]).padding(0.1);
const y = d3.scaleLinear().range([height, 0]);

const xAxisGroup = chartGroup.append("g").attr("transform", `translate(0,${height})`);
const yAxisGroup = chartGroup.append("g");

function updateHistogram(year) {
    const data = dataByYear[year];

    x.domain(data.map(d => d.team));
    y.domain([0, d3.max(data, d => d.goals)]);

    xAxisGroup.transition().duration(1000).call(d3.axisBottom(x));
    yAxisGroup.transition().duration(1000).call(d3.axisLeft(y));

    const bars = chartGroup.selectAll(".bar").data(data, d => d.team);

    bars.join(
        enter => enter.append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.team))
            .attr("width", x.bandwidth())
            .attr("y", height)
            .attr("height", 0)
            .transition().duration(1000)
            .attr("y", d => y(d.goals))
            .attr("height", d => height - y(d.goals)),
        update => update.transition().duration(1000)
            .attr("x", d => x(d.team))
            .attr("width", x.bandwidth())
            .attr("y", d => y(d.goals))
            .attr("height", d => height - y(d.goals)),
        exit => exit.transition().duration(1000)
            .attr("y", height)
            .attr("height", 0)
            .remove()
    );
}

// Initial rendering
updateHistogram("2022");

// Change based on selector
document.getElementById("yearSelect").addEventListener("change", function() {
    updateHistogram(this.value);
});
