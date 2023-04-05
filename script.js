const parser = d3.timeParse("%H:%M:%S");

d3.dsv(';', '147_vehiculos_mal_estacionados.csv', d => {
  d.hora_ingreso = parser(d.hora_ingreso);
  d.rangohs = d3.timeFormat("%H:%M")(d.hora_ingreso) + '-' + d3.timeFormat("%H:%M")(d3.timeHour.offset(d.hora_ingreso, 1));
  return d;
}).then(data => {
  const grouped = d3.rollup(data, v => v.length, d => d.rangohs);
  const sorted = Array.from(grouped, d => ({ rangohs: d[0], frequencia: d[1] })).sort((a, b) => d3.ascending(a.rangohs, b.rangohs));
  const chartData = sorted.map(d => ({ rangohs: d.rangohs, frequencia: d.frequencia }));
  let chart = Plot.plot({
    grid: true,
    x: {
      label: "Intervalo de horas"
    },
    y: {
      label: "Frequencia"
    },
    marks: [
      Plot.line(chartData, {x: "rangohs", y: "frequencia", curve: "catmull-rom"}),
      Plot.dot(chartData, {x: "rangohs", y: "frequencia", fill: "currentColor"}),
    ]
  });
  d3.select('#chart').append(() => chart);
});

