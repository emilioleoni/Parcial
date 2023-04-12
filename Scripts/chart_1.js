const mapaFetch = d3.json('CSVS/barrios-caba.geojson')
const dataFetch = d3.dsv(';', 'CSVS/147_vehiculos_mal_estacionados.csv', d3.autoType)

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {
  
  /* Agrupamos reclamos x barrio */
  const estacionadosPorBarrio = d3.group(data, d => d.domicilio_barrio) // crea un Map
  console.log('estacionadosPorBarrio', estacionadosPorBarrio)
  
  /* Mapa Coroplético */
  let chartMap = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
    color: {
      // Quantize continuo (cant. denuncias) -> discreto (cant. colores)
      type: 'quantize', 
      n: 5,
      scheme: 'ylorbr',
      label: 'Cantidad de denuncias',
      legend: true,
    },
    marks: [
      Plot.geo(barrios, {
        fill: d => {
          let nombreBarrio = d.properties.BARRIO
          let cantReclamos = estacionadosPorBarrio.get(nombreBarrio).length
          return cantReclamos
        },
        stroke: '#ccc',
        title: d => `${d.properties.BARRIO}\n${d.properties.DENUNCIAS} denuncias`,
      }),
    ],
  })

  /* Agregamos al DOM la visualización chartMap */
  d3.select('#chart_1').append(() => chartMap)
})
