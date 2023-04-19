const mapaFetch = d3.json('CSVS/barrios-caba.geojson')
const dataFetch = d3.dsv(';', 'CSVS/147_vehiculos_mal_estacionados.csv', d3.autoType)

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {
  
  /* Agrupamos reclamos x barrio */
<<<<<<< HEAD
  const estacionadosPorBarrio = d3.group(data, d => d.domicilio_barrio) // crea un Map
  console.log('estacionadosPorBarrio', estacionadosPorBarrio)
  const colorScale = d3.scaleSequential()
  .domain([0, d3.max(data, d => d.cantidad)])
  .interpolator(d3.interpolateYlOrBr);
=======
  const reclamosPorBarrio = d3.group(data, d => d.domicilio_barrio) // crea un Map
  console.log('reclamosPorBarrio', reclamosPorBarrio)
  
  /* A cada feature del mapa le agregamos la prop DENUNCIAS */
  barrios.features.forEach(d => {
    let nombreBarrio = d.properties.BARRIO
    let cantReclamos =  reclamosPorBarrio.get(nombreBarrio).length
    d.properties.DENUNCIAS = cantReclamos

    console.log(nombreBarrio + ': ' + cantReclamos)
  })


>>>>>>> 0a396bb3ad9a50d50b78b3677930e7dabfd1e0a8
  /* Mapa Coroplético */
  let chartMap = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    width: 600,
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
    color: {
      // Quantize continuo (cant. denuncias) -> discreto (cant. colores)
      type: 'quantize', 
      n: 10,
      scheme: 'oranges',
      label: 'Cantidad de denuncias',
      legend: true,
    },
    marks: [
      Plot.geo(barrios, {
        fill: d => d.properties.DENUNCIAS,
        stroke: 'gray',
        title: d => `${d.properties.BARRIO}\n${d.properties.DENUNCIAS} denuncias`,
      }),
      Plot.text(
        barrios.features,
        Plot.centroid({
          text: (d) => d.properties.BARRIO,
          fill: "white",
          textAnchor: "center",
          filter: (d) => d.properties.DENUNCIAS > 1200
        })
      )
    ],
  })

  /* Agregamos al DOM la visualización chartMap */
  d3.select('#chart_1').append(() => chartMap)


})
