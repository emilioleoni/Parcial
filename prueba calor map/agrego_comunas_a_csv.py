from unidecode import unidecode
import pandas as pd
barrio_a_comuna = {
    'Agronomía': 15,
    'Almagro': 5,
    'Balvanera': 3,
    'Barracas': 4,
    'Belgrano': 13,
    'Boedo': 5,
    'Caballito': 6,
    'Chacarita': 15,
    'Coghlan': 12,
    'Colegiales': 13,
    'Constitución': 1,
    'Flores': 7,
    'Floresta': 10,
    'La Boca': 4,
    'Liniers': 9,
    'Mataderos': 9,
    'Monte Castro': 10,
    'Montserrat': 1,
    'Nueva Pompeya': 4,
    'Nuñez': 13,
    'Palermo': 14,
    'Parque Avellaneda': 9,
    'Parque Chacabuco': 7,
    'Parque Chas': 15,
    'Parque Patricios': 4,
    'Puerto Madero': 1,
    'Recoleta': 2,
    'Retiro': 1,
    'Saavedra': 12,
    'San Cristóbal': 3,
    'San Nicolás': 1,
    'San Telmo': 1,
    'Velez Sársfield': 10,
    'Versalles': 10,
    'Villa Crespo': 15,
    'Villa del Parque': 11,
    'Villa Devoto': 11,
    'Villa General Mitre': 11,
    'Villa Lugano': 8,
    'Villa Luro': 10,
    'Villa Ortúzar': 15,
    'Villa Pueyrredón': 12,
    'Villa Real': 10,
    'Villa Riachuelo': 8,
    'Villa Santa Rita': 11,
    'Villa Soldati': 8,
    'Villa Urquiza': 12
}


def comparar_palabras(palabra1, palabra2):
    palabra1_sin_tildes = unidecode(palabra1.lower())
    palabra2_sin_tildes = unidecode(palabra2.lower())
    
    return palabra1_sin_tildes == palabra2_sin_tildes

df=pd.read_csv("147_vehiculos_mal_estacionados.csv",';')
cant_comunas={}
for i in range(1,16):
    cant_comunas[i]=0
for i in range(len(df)):
    cant_comunas[df["domicilio_comuna"].iloc[i]]+=1

datos_lista = list(cant_comunas.items())

# Crear el DataFrame
df = pd.DataFrame(datos_lista, columns=['comuna', 'cantidad'])
df.to_csv("cant_comunas.csv",";",index=False)