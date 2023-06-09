// Load the first CSV data
d3.csv('CSVS/multas_por_hstotal.csv').then(function(data1) {
  // Create the chart
  data1.forEach(function(d) {
    d.hora = +d.hora;
    d.cantidad = +d.cantidad;
  });

  d3.csv('CSVS/multas_por_hs.csv').then(function(data2) {
    // Process the data
    data2.forEach(function(d) {
      d.hora = +d.hora;
      d.cantidad = +d.cantidad;
    });

    let chart = Plot.plot({
      marginTop: 50,
      marginBottom: 70,
      height:600,
      grid: true,
      width: 1400,
      style: {
        fontSize: "21",
        fontFamily: "Lato, sans-serif",
      },
      x: {
        label: "Hora del día",
        domain: [0, 23],
        tickValues: d3.range(0, 24),
        tickFormat: x => x,
        line: true,
        
      },
      y: {
        label: "↑ Cantidad de denuncias",
        domain: [0, 30],
        line:true,
      },
      marks: [
        Plot.line(data2, {x: "hora", y: "cantidad", stroke: "maroon",strokeWidth: 5}),
        Plot.dot(data2, {x: 12, y: 20, fill: "maroon", r: 6}),
        Plot.text(["12:00"], {
          x: 12,
          y: data2.find(d => d.hora === 12).cantidad + 3,
          fontWeight: "bold",
          fontSize: 20,
          fontFamily: "Lato, sans-serif",
          fill: "maroon",
        })
      ]
    });

    d3.select('#chart_3').append(() => chart);
  });
});
