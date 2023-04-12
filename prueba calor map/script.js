var mymap = L.map('mapid').setView([-34.603722, -58.381592], 12);

// Cargar datos de comunas en formato GeoJSON
var comunasLayer = omnivore.geojson('comunas.geojson')
    .on('ready', function() {
        // Cargar datos del archivo CSV
        d3.csv('cant_comunas.csv', function(d) {
            return {
                comuna: +d.comuna,
                cantidad: +d.cantidad,
            };
        }).then(function(datos) {
            // Crear un objeto de opciones para la capa de las comunas
            var options = {
                valueProperty: 'cantidad',
                scale: ['white', 'red'],
                steps: 5,
                mode: 'q',
                style: {
                    color: '#999',
                    weight: 2,
                    fillOpacity: 0.7
                },
                onEachFeature: function(feature, layer) {
                    layer.bindPopup('Comuna ' + feature.properties.comuna + '<br>Cantidad: ' + feature.properties.cantidad);
                }
            };

            // Agregar datos a la capa de las comunas
            comunasLayer.choropleth(options, datos).addTo(mymap);
        });
    })
    .addTo(mymap);

// Agregar capa de teselas del mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
}).addTo(mymap);
