# Bazowy obraz Pythona
FROM python:3.9

# Instalacja zależności systemowych
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    && rm -rf /var/lib/apt/lists/*

# Utworzenie katalogu dla projektu
WORKDIR /code

# Instalacja zależności Pythona
COPY requirements.txt /code/
RUN pip install --no-cache-dir -r requirements.txt

# Skopiowanie kodu źródłowego projektu
COPY . /code/

RUN sleep 30s
# Uruchomienie migracji i serwera Django
CMD python manage.py migrate
CMD python manage.py runserver 0.0.0.0:8000

