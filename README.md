# Tenda Rasa

Monorepo Tenda Rasa. Saat ini **semua service jalan lewat Docker Compose secara lokal** — belum ada target deploy cloud (Fly.io/Netlify sudah tidak dipakai).

| Folder | Isi | Stack |
|---|---|---|
| `tenda-rasa-fe` | Frontend (web app) | Vue 3 + Vite + TypeScript |
| `tenda-rasa-be` | Backend API + Socket.IO + worker order | Node/Express + Sequelize |
| `docker` | Orkestrasi service untuk local dev (termasuk Postgres) | Docker Compose |
| `n8n-workflow` | File export workflow n8n (chatbot) — di-import manual ke n8n, lihat bagian "Import workflow n8n" | n8n |

## Prasyarat

- Docker Desktop (Docker Engine + Compose v2)
- Node.js + npm

## Environment file

Ada 2 jenis file env di tiap folder (`docker/`, `tenda-rasa-be/`, `tenda-rasa-fe/`), **tidak ada di git** (lihat `.gitignore`), jadi harus dibuat manual sebelum running. Tiap folder juga punya **`.env.example`** (aman di-commit, cuma daftar nama variabel tanpa value) sebagai referensi variabel apa saja yang wajib diisi — copy jadi `.env` lalu isi value asli.

- **`.env`** — file yang **benar-benar dibaca** oleh docker compose, `dotenv` (backend), dan `vite` (frontend). Isi untuk **development lokal**.
- **`.env.dev`** — referensi value untuk **server/environment lain di luar lokal**, kalau nanti ada. Tidak dibaca otomatis oleh tool manapun — dipakai lewat `switch-env.ps1` kalau mau tes value itu di lokal (lihat bawah).

Jangan pernah menaruh value asli (password, API key) di file selain `.env`/`.env.dev`, dan jangan commit kedua file itu ke git.

### Tes value staging di lokal (opsional)

`switch-env.ps1` di root menukar isi `.env` aktif dengan `.env.dev` sementara, tanpa menghilangkan value lokal asli (di-backup otomatis ke `.env.original`):

```powershell
./switch-env.ps1 -Target staging   # .env sekarang berisi value staging
# ...testing...
./switch-env.ps1 -Target local     # kembalikan .env ke value lokal asli
```

Bisa dibatasi ke folder tertentu: `./switch-env.ps1 -Target staging -Scope tenda-rasa-be`. Setelah switch, restart docker compose / `npm run dev` supaya baca `.env` yang baru.

## Menjalankan di lokal (development)

**1. Backend + database + redis + n8n (via Docker Compose)**

```powershell
cd docker
docker compose up --build
```

Service yang naik:
- `postgres` — database utama (dipakai backend)
- `postgres_n8n` — database khusus n8n
- `redis` — dipakai untuk queue (BullMQ)
- `n8n` — chatbot flow automation
- `tenda-rasa-be` — backend API (auto-reload lewat nodemon selama container jalan, jadi perubahan kode di `tenda-rasa-be/src` langsung kepakai tanpa rebuild)

Cek semua service sudah `running`/`healthy`:
```powershell
docker compose ps
```

> **Catatan:** script di `docker/init-db/` (`01_init.sql`, `02_...`, `03_...`, dst — urutan angka menentukan urutan eksekusi) cuma jalan otomatis **sekali**, saat volume Postgres pertama kali dibuat (fresh/kosong). Kalau nambah file baru ke folder itu setelah container sudah pernah jalan, jalankan manual:
> ```powershell
> docker exec -i postgres_app sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"' < docker/init-db/nama_file.sql
> ```
> (mau reset total dari awal dan jalankan ulang semua init script otomatis: `docker compose down -v` — **ini menghapus semua data di volume**, konfirmasi dulu sebelum jalankan.)

**2. Frontend**

Frontend **tidak** dijalankan lewat Docker. Jalankan terpisah:

```powershell
cd tenda-rasa-fe
npm install
npm run dev
```

### Link yang bisa dibuka di browser (lokal)

Port sesuai `docker/.env` kamu saat ini (kalau kamu ubah port di `.env`, cek lagi dengan `docker compose ps` atau `docker port <container>`):

| Aplikasi | URL |
|---|---|
| **Frontend (aplikasi utama)** | http://localhost:5173 |
| Backend API | http://localhost:3001/api/v1 |
| n8n (flow chatbot) | http://localhost:5678 |

Menghentikan semua service Docker:
```powershell
cd docker
docker compose down
```

### Import workflow n8n

Workflow chatbot di-export sebagai file di [`n8n-workflow/`](n8n-workflow/). File ini **tidak otomatis ter-import** ke n8n (n8n tidak baca folder itu sama sekali) — import manual sekali lewat browser:

1. Buka http://localhost:5678
2. Menu titik tiga (kanan atas) → **Import from File**
3. Pilih file `.json` di `n8n-workflow/`
4. Setelah import, **buat ulang credential** yang dipakai node-node di workflow itu (Postgres, Gemini API key, dst) langsung di n8n — credential tidak ikut ter-export di file JSON demi keamanan.

## Catatan keamanan

- Jangan pernah commit file `.env`/`.env.dev`, atau menaruh password/API key langsung di kode maupun file `.md`.
- Kalau pernah tidak sengaja ke-commit, hapus dari tracking git **dan** rotate/ganti kredensial yang bersangkutan — riwayat commit lama tetap menyimpan value sebelumnya sampai di-rewrite.
- Lihat `CLAUDE.md` di root untuk aturan lengkap area sensitif project ini (payment/order flow, migration, deployment config, dsb).
