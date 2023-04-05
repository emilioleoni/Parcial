// Cargar el archivo CSV con PapaParse
Papa.parse("multas_con_dias.csv", {
    download: true,
    header: true,
    complete: function(results) {
      // Obtener un array de objetos con las denuncias
      var denuncias = results.data;
  
      // Crear un objeto para contar las denuncias por día
      var denunciasPorDia = {};
  
      // Contar las denuncias por día
      denuncias.forEach(function(denuncia) {
        var fecha = new Date(denuncia.fecha_ingreso);
        var dia = fecha.toLocaleDateString();
        if (!denunciasPorDia[dia]) {
          denunciasPorDia[dia] = 0;
        }
        denunciasPorDia[dia]++;
      });
  
      // Convertir los datos en un array de objetos para Chart.js
      var data = {
        labels: Object.keys(denunciasPorDia),
        datasets: [{
          label: "Denuncias de Tránsito",
          data: Object.values(denunciasPorDia),
          backgroundColor: "rgba(54, 162, 235, 0.5)"
        }]
      };
  
      // Configurar las opciones del gráfico
      var options = {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      };
  
      // Crear el gráfico de barras con Chart.js
      var chart = new Chart("chart", {
        type: "bar",
        data: data,
        options: options
      });
    }
  });
  