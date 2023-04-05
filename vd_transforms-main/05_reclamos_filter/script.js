// config. números español
const locale = {
  decimal: ',',
  thousands: '.',
  grouping: [3],
}
d3.formatDefaultLocale(locale)

d3.dsv(';', 'suaci-marzo-2021.csv', d3.autoType).then(data => {
  console.log(data)
  // Guardamos el svg generado en la variable chart
  let chart = Plot.plot({
    x: {
      grid: true,
      tickFormat: d3.format(',.0f'),
    },
    y: {
      label: '',
    },
    marks: [
      Plot.barX(
        data,
        Plot.groupY(
          { x: 'count' },
          {
            filter: d => {
              return (
                d.categoria == 'FISCALIZACIÓN ACTIVIDADES COMERCIALES' &&
                d.prestacion.includes('SIN PERMISO')
              )
            },
            y: 'prestacion',
            sort: { y: 'x', reverse: true },
          },
        ),
      ),
    ],
    marginLeft: 250,
    // width: 1500,
    // height: 3000,
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#chart').append(() => chart)
})
