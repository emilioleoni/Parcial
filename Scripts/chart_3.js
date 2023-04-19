  d3.csv('CSVS/multas_por_hs.csv').then(function(data2) {
    data2.forEach(function(d) {
      d.hora = +d.hora;
      d.cantidad = +d.cantidad;
    });

    const colorScale = d3.scaleSequential(interpolateYlOrBr)
      .domain([0, d3.max(data1.concat(data2), d => d.cantidad)]);

    let chart = Plot.plot({
      marginTop: 40,
      marginBottom: 40,
      grid: true,
      width: 1400,
      x: {
        label: "Hora del dia",
        domain: [0, 23],
        tickValues: d3.range(0, 24),
        tickFormat: x => x + ":00",
      },
      y: {
        label: "Cantidad de multas",
        domain: [0, 60],
      },
      marks: [
        Plot.line(data1, {x: "hora", y: "cantidad", stroke: d => colorScale(d.cantidad), strokeWidth: 5}),
        Plot.dot(data1, {x: "hora", y: "cantidad", fill: d => colorScale(d.cantidad)}),
        Plot.line(data2, {x: "hora", y: "cantidad", stroke: d => colorScale(d.cantidad),strokeWidth: 5}),
        Plot.dot(data2, {x: "hora", y: "cantidad", fill: d => colorScale(d.cantidad)}),
        Plot.text(["17:00"], {
          x: 17,
          y: data1.find(d => d.hora === 17).cantidad + 5,
          fontWeight: "bold",
          fontSize: 20,
          fill: d => colorScale(d.cantidad),
        }),
        Plot.text(["12:00"], {
          x: 12,
          y: data2.find(d => d.hora === 12).cantidad + 5,
          fontWeight: "bold",
          fontSize: 20,
          fill: d => colorScale(d.cantidad),
        })
      ]
    });

    d3.select('#chart_3').append(() => chart);
  });

