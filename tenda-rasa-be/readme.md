deploy to fly.io
fly apps create tenda-rasa-be

set secret (ganti <...> dengan value asli, jangan pernah commit value asli ke git)
fly secrets set `
"REDIS_HOST=<upstash-redis-host>" `
"REDIS_PORT=6379" `
"REDIS_USERNAME=<upstash-redis-username>" `
"REDIS_PASSWORD=<upstash-redis-password>" `
"REDIS_TLS=true" `
--app tenda-rasa-be

fly secrets set `
"DB_HOST=tenda-rasa-db.internal" `
"DB_PORT=5432" `
"DB_USER=<db-user>" `
"DB_PASSWORD=<db-password>" `
"DB_NAME=tenda_rasa" `
--app tenda-rasa-be

cek secret yang sudah di-set (value tidak ditampilkan)
fly secrets list --app tenda-rasa-be

pastikan ada Dockerfile, fly.toml

jalankan
fly deploy --app tenda-rasa-be

cek status
fly status -a tenda-rasa-be