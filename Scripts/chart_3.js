// Load the first CSV data
Plotly.d3.csv('../CSVS/multas_por_hstotal.csv', function(err, data1) {
  if (err) throw err;

  // Extract the hora and cantidad columns from the first CSV data
  var horas1 = data1.map(function(row) {
    return row.hora;
  });

  var cantidades1 = data1.map(function(row) {
    return row.cantidad;
  });

  // Load the second CSV data
  Plotly.d3.csv('../CSVS/multas_por_hs.csv', function(err, data2) {
    if (err) throw err;

    // Extract the hora and cantidad columns from the second CSV data
    var horas2 = data2.map(function(row) {
      return row.hora;
    });

    var cantidades2 = data2.map(function(row) {
      return row.cantidad;
    });

    // Create two line graphs with markers using Plotly
    var trace1 = {
      x: horas1,
      y: cantidades1,
      mode: 'lines+markers', // Include markers along with lines
      type: 'scatter',
      name: 'En la semana',
      line: {color: 'blue'},
      marker: {size: 6, color: 'blue'} // Set marker size and color
    };

    var trace2 = {
      x: horas2,
      y: cantidades2,
      mode: 'lines+markers', // Include markers along with lines
      type: 'scatter',
      name: 'Los jueves el dia mas intenso',
      line: {color: 'red'},
      marker: {size: 6, color: 'red'} // Set marker size and color
    };

    var layout = {
      title: 'Denuncias dependiendo la hora del día',
      xaxis: {
        title: 'Hora',
        range: [0, 24],
        tickmode: 'linear',
      },
      yaxis: {title: 'Cantidad'}
    };

    var data = [trace1, trace2];

    Plotly.newPlot('chart_3', data, layout);
  });
});
