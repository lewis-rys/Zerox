import numpy as np
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import LSTM, Dense, Embedding
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.utils import to_categorical
import os

ARCHIVO_ENTRENAMIENTO = r"C:\Users\Luis\Zerox\brattyia\entrenamiento.txt"
ARCHIVO_MODELO = r"C:\Users\Luis\Zerox\brattyia\modelo_brattyia.h5"


# -----------------------------
# 1. Cargar datos
# -----------------------------
def cargar_datos(nombre_archivo):
    textos = []
    if not os.path.isfile(nombre_archivo):
        print(f"No se encontró {nombre_archivo}")
        exit()
    with open(nombre_archivo, "r", encoding="utf-8") as f:
        for linea in f:
            linea = linea.strip()
            if "|" in linea:
                pregunta, respuesta = linea.split("|", 1)
                textos.append((pregunta.strip(), respuesta.strip()))
    return textos

datos = cargar_datos(ARCHIVO_ENTRENAMIENTO)

# -----------------------------
# 2. Preprocesamiento
# -----------------------------
todas_las_lineas = []
for pregunta, respuesta in datos:
    todas_las_lineas.append(pregunta)
    todas_las_lineas.append(respuesta)

tokenizer = Tokenizer()
tokenizer.fit_on_texts(todas_las_lineas)
total_palabras = len(tokenizer.word_index) + 1

secuencias = []
for pregunta, respuesta in datos:
    tokens_pregunta = tokenizer.texts_to_sequences([pregunta])[0]
    tokens_respuesta = tokenizer.texts_to_sequences([respuesta])[0]
    secuencia = tokens_pregunta + tokens_respuesta
    for i in range(1, len(secuencia)):
        secuencias.append(secuencia[:i+1])

max_len = max([len(s) for s in secuencias])
secuencias = pad_sequences(secuencias, maxlen=max_len, padding='pre')
secuencias = np.array(secuencias)

X = secuencias[:, :-1]
y = secuencias[:, -1]
y = to_categorical(y, num_classes=total_palabras)

# -----------------------------
# 3. Cargar o crear modelo
# -----------------------------
if os.path.isfile(ARCHIVO_MODELO):
    print("Cargando modelo guardado...")
    model = load_model(ARCHIVO_MODELO)
else:
    print("Creando y entrenando modelo desde cero...")
    model = Sequential()
    model.add(Embedding(total_palabras, 100, input_length=max_len-1))
    model.add(LSTM(256, return_sequences=True))
    model.add(LSTM(128))
    model.add(Dense(total_palabras, activation='softmax'))
    model.compile(loss='categorical_crossentropy', optimizer='adam')

    print("Entrenando modelo generativo... esto puede tardar varios minutos")
    model.fit(X, y, epochs=200, batch_size=16, verbose=1)

    # Guardar modelo
    model.save(ARCHIVO_MODELO)
    print(f"Modelo guardado como {ARCHIVO_MODELO}")

# -----------------------------
# 4. Función para generar texto con sampling
# -----------------------------
def sample(preds, temperatura=1.0):
    preds = np.asarray(preds).astype('float64')
    preds = np.log(preds + 1e-8) / temperatura
    exp_preds = np.exp(preds)
    preds = exp_preds / np.sum(exp_preds)
    probas = np.random.multinomial(1, preds, 1)
    return np.argmax(probas)

def generar_texto(texto_inicial, max_palabras=50, temperatura=0.7):
    resultado = texto_inicial
    for _ in range(max_palabras):
        tokens = tokenizer.texts_to_sequences([resultado])[0]
        tokens = pad_sequences([tokens], maxlen=max_len-1, padding='pre')
        pred = model.predict(tokens, verbose=0)[0]
        palabra_indice = sample(pred, temperatura)
        palabra = ""
        for w, i in tokenizer.word_index.items():
            if i == palabra_indice:
                palabra = w
                break
        if palabra == "":
            break
        resultado += " " + palabra
        if palabra in [".", "!", "?"]:
            break
    return resultado

# -----------------------------
# 5. Interfaz de usuario en consola
# -----------------------------
if __name__ == "__main__":
    print("Modelo listo. Escribe 'salir' para terminar.")
    while True:
        entrada = input("> ").strip()
        if entrada.lower() in ["salir", "exit", "quit"]:
            print("¡Hasta pronto!")
            break
        print(generar_texto(entrada))
