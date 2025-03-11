(() => {
    const data = [
        { team: "Brazil", goals: 10, wins: 4 }, { team: "Argentina", goals: 8, wins: 3 }, { team: "France", goals: 7, wins: 3 },
        { team: "Germany", goals: 5, wins: 2 }, { team: "Spain", goals: 4, wins: 3 }, { team: "Italy", goals: 9, wins: 1 },
        { team: "Portugal", goals: 6, wins: 3 }, { team: "England", goals: 4, wins: 2 }, { team: "Belgium", goals: 3, wins: 1 }, { team: "Netherlands", goals: 1, wins: 2 }
    ];

    const svg = d3.select("#scatterChart"),
        margin = { top: 30, right: 40, bottom: 60, left: 60 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain([0, 12]).range([0, width]);
    const y = d3.scaleLinear().domain([0, 5]).range([height, 0]);

    // Axes with gridlines
    g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(6))
        .call(g => g.selectAll(".tick line").clone().attr("y2", -height).attr("stroke-opacity", 0.1));

    g.append("g")
        .call(d3.axisLeft(y).ticks(5))
        .call(g => g.selectAll(".tick line").clone().attr("x2", width).attr("stroke-opacity", 0.1));

    // Axis Labels
    svg.append("text")
        .attr("x", width / 2 + margin.left)
        .attr("y", height + margin.top + 50)
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .attr("font-weight", "bold")
        .text("Goals Scored");

    svg.append("text")
        .attr("x", -(height / 2) - margin.top)
        .attr("y", 15)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .attr("font-weight", "bold")
        .text("Matches Won");

    // Tooltip
    const tooltip = d3.select("body").append("div")
        .style("position", "absolute")
        .style("background", "#fff")
        .style("border", "1px solid #ccc")
        .style("padding", "6px 12px")
        .style("border-radius", "4px")
        .style("box-shadow", "0 2px 8px rgba(0,0,0,0.2)")
        .style("opacity", 0)
        .style("pointer-events", "none");

    // Circles (Points)
    g.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("cx", d => x(d.goals))
        .attr("cy", d => y(d.wins))
        .attr("r", 6)
        .attr("fill", "#0077cc")
        .attr("stroke", "white")
        .attr("stroke-width", 1.5)
        .on("mouseover", (event, d) => {
            tooltip.transition().duration(200).style("opacity", 0.9);
            tooltip.html(`<strong>${d.team}</strong><br>Goals: ${d.goals}<br>Wins: ${d.wins}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", () => tooltip.transition().duration(500).style("opacity", 0));

    // Text Labels near points (adjusted position)
    g.selectAll("text.label")
        .data(data)
        .enter().append("text")
        .attr("x", d => x(d.goals) + 8)
        .attr("y", d => y(d.wins) - 5)
        .attr("font-size", "11px")
        .attr("fill", "#333")
        .attr("font-weight", "bold")
        .text(d => d.team);
})();
