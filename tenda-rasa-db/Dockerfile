FROM postgres:15

ENV POSTGRES_DB=tenda_rasa
ENV POSTGRES_USER=postgres
ENV PGDATA=/data/db

COPY init.sql /docker-entrypoint-initdb.d/
VOLUME /data
EXPOSE 5432