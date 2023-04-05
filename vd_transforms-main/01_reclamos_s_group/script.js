// config. números español
const locale = {
  decimal: ',',
  thousands: '.',
  grouping: [3],
}
d3.formatDefaultLocale(locale)

d3.dsv(';', '147_18-24_agosto.csv', d3.autoType).then(data => {
  console.log(data.length)
  let chart = Plot.plot({
    marks: [
      Plot.barX(data, {
        x: () => 1,
        y: 'categoria',
        // sort: { y: 'x', reverse: true, limit: 10 },
      }),
    ],
    marginLeft: 200,
    x: {
      grid: true,
      tickFormat: d3.format(',.0f'),
    },
    y: {
      label: '',
    },
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#chart').append(() => chart)
})
