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
    let chart=Plot.plot({
      grid: true,
      width:1400,
      x: {
        label: "Hora del dia",
        domain: [0, 23],
        tickValues: d3.range(0, 24),
        tickFormat: x => x + ":00"
      },
      y: {
        label: "Cantidad de multas",
        domain: [0, 60],
      },
      marks: [
        Plot.line(data1, {x: "hora", y: "cantidad", stroke: "orange"}),
        Plot.dot(data1, {x: "hora", y: "cantidad", fill: "orange"}),
        Plot.line(data2, {x: "hora", y: "cantidad", stroke: "maroon"}),
        Plot.dot(data2, {x: "hora", y: "cantidad", fill: "maroon"}),
        Plot.text(["17:00"], {
          x: 17,
          y: data1.find(d => d.hora === 17).cantidad + 5,
          fontWeight: "bold",
          fontSize: 20,
          fill: "orange",
        }),
        Plot.text(["12:00"], {
          x: 12,
          y: data2.find(d => d.hora === 12).cantidad + 5,
          fontWeight: "bold",
          fontSize: 16,
          fill: "maroon",
        })
      ]
      
    });
      

    d3.select('#chart_3').append(() => chart);
  });
});