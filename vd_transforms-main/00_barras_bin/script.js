d3.csv('data2000.csv', d3.autoType).then(data => {
  console.log(data)
  // Guardamos el svg generado en la variable chart
  let chart = Plot.plot({
    y: {
      grid: true,
    },
    marks: [
      Plot.barY(
        data,
        Plot.binX(
          {
            y: 'count',
            title: d => {
              return d.map(c => c.country)
            },
          },
          { x: 'life_expect', thresholds: 10 },
        ),
      ),

      Plot.text(
        data,
        Plot.binX(
          { y: 'count' },
          { x: 'life_expect', thresholds: 10, text: d => d.length, dy: -10 },
        ),
      ),

      Plot.ruleY([0]),
    ],
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#chart').append(() => chart)
})
