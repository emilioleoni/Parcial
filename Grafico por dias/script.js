// Leer el archivo CSV con D3.js
d3.csv("multas_con_dias.csv").then(function(denuncias) {


    // Calcular la cantidad total de denuncias
    var cantidadTotal = d3.sum(denuncias, function(d) { return 1; });
  
    // Configurar las opciones del gráfico
    var margin = {top: 20, right: 20, bottom: 30, left: 40};
    var width = 960 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
  
    var x = d3.scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(["Denuncias"]);
  
    var y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, cantidadTotal]);
  
    var xAxis = d3.axisBottom(x);
  
    var yAxis = d3.axisLeft(y)
      .ticks(10);
  
    var svg = d3.select("#chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
    svg.selectAll(".bar")
      .data([cantidadTotal])
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x("Denuncias"); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d); })
      .attr("height", function(d) { return height - y(d); });
  
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
  
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
  
  });
  