from flask import Flask, jsonify
from flask_cors import CORS
import os
import subprocess

# Initialize Flask app
app = Flask(__name__)
CORS(app)

@app.route('/api/run-prueba', methods=['POST'])
def run_prueba():
    try:
        # Ruta al script prueba.py
        script_path = os.path.join(os.path.dirname(__file__), 'prueba.py')
        print(f"Attempting to execute script at: {script_path}")

        if not os.path.exists(script_path):
            print(f"Script not found: {script_path}")
            return jsonify({"error": f"Script not found at {script_path}"}), 404

        # Ejecutar el script prueba.py
        process = subprocess.Popen(['python', script_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        stdout, stderr = process.communicate()

        print(f"Script stdout: {stdout.decode('utf-8')}")
        print(f"Script stderr: {stderr.decode('utf-8')}")

        if process.returncode != 0:
            return jsonify({"error": stderr.decode('utf-8')}), 500

        return jsonify({"message": "Script executed successfully", "output": stdout.decode('utf-8')})
    except Exception as e:
        print(f"Error running script: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

