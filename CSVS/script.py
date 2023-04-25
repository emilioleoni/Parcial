from datetime import datetime
import pandas as pd
def dia_de_la_semana(fecha):
    dias_semana = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
    dia_semana = datetime.strptime(fecha, '%d/%m/%Y').weekday()
    return dias_semana[dia_semana]


a=pd.read_csv("CSVS/147_vehiculos_mal_estacionados.csv",';')
a["dia"]=a['fecha_ingreso'].apply(dia_de_la_semana)

counts = a['dia'].value_counts()

# Then, create a new DataFrame with the results
df = pd.DataFrame({
    'dia': counts.index,
    'cantidad': counts.values
})
print(df)