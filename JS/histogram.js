(() => {
    // All code wrapped in an IIFE to avoid global scope pollution

    const dataByYear = {
        "2023": [
            { team: "Brazil", goals: 12 }, { team: "Argentina", goals: 9 }, { team: "France", goals: 11 },
            { team: "Germany", goals: 4 }, { team: "Spain", goals: 8 }, { team: "Italy", goals: 5 },
            { team: "Portugal", goals: 10 }, { team: "England", goals: 6 }, { team: "Belgium", goals: 7 }, { team: "Netherlands", goals: 5 }
        ],
        "2022": [
            { team: "Brazil", goals: 10 }, { team: "Argentina", goals: 8 }, { team: "France", goals: 7 },
            { team: "Germany", goals: 5 }, { team: "Spain", goals: 6 }, { team: "Italy", goals: 4 },
            { team: "Portugal", goals: 7 }, { team: "England", goals: 5 }, { team: "Belgium", goals: 3 }, { team: "Netherlands", goals: 4 }
        ],
        "2021": [
            { team: "Brazil", goals: 8 }, { team: "Argentina", goals: 6 }, { team: "France", goals: 9 },
            { team: "Germany", goals: 5 }, { team: "Spain", goals: 5 }, { team: "Italy", goals: 7 },
            { team: "Portugal", goals: 6 }, { team: "England", goals: 4 }, { team: "Belgium", goals: 5 }, { team: "Netherlands", goals: 3 }
        ],
        "2020": [
            { team: "Brazil", goals: 7 }, { team: "Argentina", goals: 5 }, { team: "France", goals: 6 },
            { team: "Germany", goals: 3 }, { team: "Spain", goals: 4 }, { team: "Italy", goals: 6 },
            { team: "Portugal", goals: 5 }, { team: "England", goals: 4 }, { team: "Belgium", goals: 2 }, { team: "Netherlands", goals: 3 }
        ]
    };

    const svgHistogram = d3.select("#histogramChart"),
        margin = { top: 20, right: 30, bottom: 40, left: 50 },
        width = +svgHistogram.attr("width") - margin.left - margin.right,
        height = +svgHistogram.attr("height") - margin.top - margin.bottom;

    const chartGroup = svgHistogram.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand().range([0, width]).padding(0.2);
    const y = d3.scaleLinear().range([height, 0]);

    const xAxisGroup = chartGroup.append("g").attr("transform", `translate(0,${height})`);
    const yAxisGroup = chartGroup.append("g");

    // Gradient for the bars
    svgHistogram.append("defs").append("linearGradient")
        .attr("id", "barGradient")
        .attr("x1", "0%").attr("x2", "0%").attr("y1", "0%").attr("y2", "100%")
        .selectAll("stop")
        .data([
            { offset: "0%", color: "#00c6ff" },
            { offset: "100%", color: "#0072ff" }
        ])
        .enter().append("stop")
        .attr("offset", d => d.offset)
        .attr("stop-color", d => d.color);

    // Function to update histogram based on year selection
    function updateHistogram(year) {
        const data = dataByYear[year];

        x.domain(data.map(d => d.team));
        y.domain([0, d3.max(data, d => d.goals)]);

        // Update axes
        xAxisGroup.transition().duration(1000).call(d3.axisBottom(x));
        yAxisGroup.transition().duration(1000).call(d3.axisLeft(y));

        // Bind data and update bars
        const bars = chartGroup.selectAll(".bar").data(data, d => d.team);

        bars.join(
            enter => enter.append("rect")
                .attr("class", "bar")
                .attr("x", d => x(d.team))
                .attr("width", x.bandwidth())
                .attr("y", height)
                .attr("height", 0)
                .attr("fill", "url(#barGradient)")
                .transition().duration(1000)
                .attr("y", d => y(d.goals))
                .attr("height", d => height - y(d.goals)),
            update => update.transition().duration(1000)
                .attr("x", d => x(d.team))
                .attr("width", x.bandwidth())
                .attr("y", d => y(d.goals))
                .attr("height", d => height - y(d.goals))
        );
    }

    // Initialize with 2023 data
    updateHistogram("2023");

    // Listen to year selector changes
    document.getElementById("yearSelect").addEventListener("change", function () {
        updateHistogram(this.value);
    });

})();
