// Leer los datos del archivo CSV
async function cargarDatos() {
    const respuesta = await fetch('../CSVS/cant_por_dia.csv');
    const datos = await respuesta.text();
    return datos;
}

// Crear el gráfico de barras paradas con Plotly
async function crearGrafico() {
    const datosCSV = await cargarDatos();
    const datos = Papa.parse(datosCSV, { header: true, delimiter: ';' }).data;

    const x = datos.map(d => d.dia);
    const y = datos.map(d => d.cantidad);
    const colores = datos.map(d => d.dia);

    const datosGrafico = [{
        x: x,  // intercambiar x e y
        y: y,  // intercambiar x e y
        type: 'bar',
        orientation: 'v',
        marker: {
            color: colores,
            colorscale: 'Viridis'
        }
    }];

    const layout = {
        xaxis: {
            title: 'Cantidad',
            autorange: true,
            showgrid: true,
            zeroline: false,
            showline: false
        },
        yaxis: {
            title: 'Día de la semana',
            // autorange: 'reversed',
            showgrid: true,
            zeroline: false,
            showline: false
        }
    };

    Plotly.newPlot('chart_2', datosGrafico, layout);
}

// Llamar a la función para crear el gráfico
crearGrafico();