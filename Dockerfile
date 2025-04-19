# Usa una imagen base de Python
FROM python:3.11-slim

# Instala las dependencias del sistema necesarias (por ejemplo, portaudio)
RUN apt-get update && apt-get install -y \
    libportaudio2 \
    && apt-get clean

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el contenido del directorio actual al contenedor
COPY . /app

# Instala las dependencias de Python
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Expone el puerto que usará tu aplicación Flask
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:5000"]
