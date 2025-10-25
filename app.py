from flask import Flask, request, jsonify, send_from_directory
import os, sys

# --- Configuración de rutas ---
BASE_DIR = os.getcwd()
BRATTY_PATH = os.path.join(BASE_DIR, 'brattyia')
sys.path.append(BRATTY_PATH)

from modelo_basico import generar_texto

app = Flask(__name__, static_folder='static')

# --- Página principal ---
@app.route('/')
def index():
    return send_from_directory(BASE_DIR, 'fronted.html')

# --- Endpoint de la IA ---
@app.route('/preguntar', methods=['POST'])
def preguntar():
    data = request.get_json()
    pregunta = data.get("pregunta", "")
    respuesta = generar_texto(pregunta, max_palabras=50)
    return jsonify({"respuesta": respuesta})

# --- Servir archivos estáticos ---
@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'static'), filename)

if __name__ == '__main__':
    app.run(debug=True)
