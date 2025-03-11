.on("mouseover", (event, d) => {
  tooltip.transition().duration(200).style("opacity", .9);
  tooltip.html(`Team: ${d.team}<br>Wins: ${d.wins}, Goals: ${d.goals}`)
      .style("left", (event.pageX + 10) + "px")
      .style("top", (event.pageY - 28) + "px");
})
.on("mouseout", () => tooltip.transition().duration(500).style("opacity", 0));
