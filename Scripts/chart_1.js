const mapaFetch = d3.json('CSVS/barrios-caba.geojson')
const dataFetch = d3.dsv(';', 'CSVS/147_vehiculos_mal_estacionados.csv', d3.autoType)
// Define tu token de acceso de Mapbox
const mapboxAccessToken = 'pk.eyJ1IjoiZXppa2FwbGFuIiwiYSI6ImNsZ2VqMXN3bjA3Y2EzZnBzdmsxc2cyamQifQ.t-IRWfIEzRrI7UM9liJ4uQ';

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {

  // Agrupamos reclamos x barrio
  const estacionadosPorBarrio = d3.group(data, d => d.domicilio_barrio);

  // Crear el mapa coroplético con Plotly
  const mapFig = {
    data: [{
      type: 'choroplethmapbox',
      geojson: barrios,
      locations: barrios.features.map(d => d.properties.BARRIO),
      z: barrios.features.map(d => estacionadosPorBarrio.get(d.properties.BARRIO).length),
      colorscale: 'YlOrBr',
      colorbar: {
        title: {
          text: 'Cantidad de denuncias'
        }
      },
      hovertemplate: '<b>%{location}</b><br>' +
                     'Denuncias: %{z}<br>' +
                     '<extra></extra>'
    }],
    layout: {
      mapbox: {
        style: 'mapbox://styles/mapbox/streets-v11',
        center: { lon: -58.44, lat: -34.56 },
        zoom: 10,
        accesstoken: mapboxAccessToken // Agregar el token de acceso de Mapbox aquí
      },
    },
  };

  // Mostrar el mapa coroplético en el DOM
  Plotly.newPlot('chart_1', mapFig);
})


