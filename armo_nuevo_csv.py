from datetime import datetime
import pandas as pd
def dia_de_la_semana(fecha):
    dias_semana = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
    dia_semana = datetime.strptime(fecha, '%d/%m/%Y').weekday()
    return dias_semana[dia_semana]


a=pd.read_csv("147_vehiculos_mal_estacionados.csv",';')
a["dia"]=a['fecha_ingreso'].apply(dia_de_la_semana)
a.to_csv("multas_con_dias.csv",';',index=False)