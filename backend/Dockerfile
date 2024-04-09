FROM python:3.12-bullseye
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip

RUN adduser django
EXPOSE 8000
COPY ./backend /app

WORKDIR /app
COPY ./backend/requirements.txt /app
RUN pip3 install -r requirements.txt --no-cache-dir
WORKDIR /app