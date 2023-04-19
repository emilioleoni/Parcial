// Reemplazar el contenido de la variable "csvData" con el contenido de tu archivo CSV
const csvData = `nro;dia;cantidad
1;Lunes;75
2;Martes;27
3;Miercoles;144
4;Jueves;168
5;Viernes;57
6;Sabado;22
7;Domingo;32`;

// Crear un parser de CSV con el delimitador punto y coma
const csvParser = d3.dsvFormat(";");

// Parsear los datos del CSV
const data = csvParser.parse(csvData, d3.autoType);

// Crear una escala de banda personalizada para el eje X
const xScale = d3.scaleBand()
  .domain(data.map(d => d.dia))
  .padding(0.1);

// Crear una escala de colores YlOrBr
const colorScale = d3.scaleSequential()
  .domain([0, d3.max(data, d => d.cantidad)])
  .interpolator(d3.interpolateYlOrBr);

// Crear el gráfico de barras
const chart = Plot.plot({
    marginTop: 30,
    style: {
        fontSize: "20",
        fontFamily: "sans-serif",
    },
  y:{
    fontSize: 10,
    label: "↑ Cantidad de multas",
  },
  x: {
    transform: xScale, // Usar la escala de banda personalizada
    axis: null, // Eliminar el eje X predeterminado
  },
  marks: [
    Plot.barY(data, {
      x: "dia",
      y: "cantidad",
      fill: (d) => colorScale(d.cantidad), // Usar la escala de colores YlOrBr
      title: (d) => `Cantidad: ${d.cantidad}`,
    }),
    // Agregar etiquetas de texto debajo de las barras
    Plot.text(data, {
      x: "dia",
      y: -5,
      text: "dia",
      fill: "black",
      textAnchor: "middle",
      font: "12px sans-serif",
      fontSize: 15,
    }),
  ],

});

// Agregar el gráfico al elemento con id "chart"
document.getElementById("chart_2").appendChild(chart);
