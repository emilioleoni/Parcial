d3.csv('data2000.csv', d3.autoType).then(data => {
  console.log(data)
  let chart = Plot.plot({
    marks: [
      Plot.barX(data, {
        y: 'country',
        x: 'pop',
        // sort: { y: 'x', reverse: true, limit: 10 },
      }),
    ],
    x: {
      grid: true,
    },
    marginLeft: 100,
  })
  d3.select('#chart').append(() => chart)
})
