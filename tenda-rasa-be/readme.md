deploy to fly.io
fly apps create tenda-rasa-be

set secret
fly secrets set `
"REDIS_HOST=premium-fox-26559.upstash.io" `
"REDIS_PORT=6379" `
"REDIS_USERNAME=default" `
"REDIS_PASSWORD=AWe_AAIncDE5OTlhY2Y3YTM4Y2Y0YTVhYjJmZWM0NDk4MjNmMzk1OHAxMjY1NTk" `
"REDIS_TLS=true" `
--app tenda-rasa-be

fly secrets set `
"DB_HOST=tenda-rasa-db.internal" `
"DB_PORT=5432" `
"DB_USER=postgres" `
"DB_PASSWORD=postgres" `
"DB_NAME=tenda_rasa" `
--app tenda-rasa-be

pastikan ada Dockerfile, fly.toml

jalankan
fly deploy --app tenda-rasa-be

cek status
fly status -a tenda-rasa-be