# Aturan Kerja untuk Claude di Project Tenda Rasa

Project ini adalah monorepo: `tenda-rasa-fe` (Vue + Vite), `tenda-rasa-be` (Node/Express + Sequelize), dan `docker/` (docker-compose untuk semua service, termasuk Postgres — jalan sepenuhnya lokal, **tidak ada deploy ke Fly.io/Netlify lagi**). Ada alur pembayaran/order di dalamnya, jadi perlakukan itu sebagai area sensitif.

## 1. JANGAN PERNAH disentuh/diubah tanpa izin eksplisit dari user

- **Semua file `.env` dan `.env.dev`** di root, `tenda-rasa-be/`, `tenda-rasa-fe/`, dan `docker/` — jangan pernah dibaca isinya untuk ditampilkan/dikutip ke chat, jangan diubah, ditimpa, atau di-commit. Ini berisi kredensial.
- `package-lock.json` (root, `tenda-rasa-be`, `tenda-rasa-fe`) — jangan dihapus atau diregenerasi ulang (`rm` + `npm install` dari nol) kecuali diminta eksplisit.
- `node_modules/`, `dist/`, `dev-dist/`, `.netlify/` — hasil build/dependency, jangan diedit manual.
- File dump & schema database: `docker/exported_schema.sql`, `docker/menu_booth_dump.sql`, `docker/init-db/*.sql` — jangan ditimpa, dijalankan ulang, atau dihapus tanpa konfirmasi. Ini bisa berisi data yang sudah terpakai.
- `docker-compose.yml` — jangan ubah service, port, atau volume mapping tanpa konfirmasi (bisa merusak local dev orang lain juga).
- `.sequelizerc` dan folder migration/seed backend — struktur migrasi database bersifat historis, jangan diedit/dihapus retroaktif.

## 2. WAJIB minta konfirmasi eksplisit sebelum menjalankan

- **Git**: `push`, `push --force`, `reset --hard`, `rebase`, `checkout`/`restore`/`clean` yang membuang perubahan, hapus branch.
- **Deploy**: `docker build`/`push`, atau perubahan apa pun yang berdampak ke environment selain lokal (kalau nanti ada deploy target baru).
- **Database**: menjalankan migration (`db:migrate`, `db:migrate:undo`), `DROP TABLE`/`DROP SCHEMA`, restore dari dump, atau query apa pun yang mengubah/menghapus data — kecuali jelas-jelas di database dummy lokal yang aman (docker compose lokal termasuk kategori ini, boleh langsung dikerjakan tanpa nanya ulang tiap kali, tapi tetap hati-hati kalau datanya sudah dipakai untuk testing/demo).
- **Dependency**: install/upgrade/downgrade package yang mengubah major version di `package.json` mana pun.
- **Hapus file/folder** di luar scratchpad — selalu konfirmasi dulu, terutama di luar direktori yang sedang dikerjakan.
- **Alur payment/order**: perubahan pada logic pembayaran, status order, atau webhook payment harus dijelaskan dampaknya dan dikonfirmasi dulu sebelum diterapkan — jangan mengubah alur ini secara diam-diam sebagai "sekalian bersih-bersih".
- Mengubah CI/CD atau `Dockerfile` walau kelihatannya kecil.

## 3. Best practice & lolos SonarQube (WAJIB diikuti di setiap perubahan kode)

Selalu tulis kode yang idiomatis untuk stack yang dipakai (TypeScript, Vue 3 Composition API di FE; Express + Sequelize di BE) dan pastikan lolos SonarQube dengan standar berikut:

- **Tidak ada kode mati/duplikat**: hapus `console.log`/`debugger` sisa debugging, kode yang di-comment-out, import/variable yang tidak dipakai.
- **Kompleksitas rendah**: hindari fungsi dengan cognitive complexity tinggi (nested if/else dalam-dalam, banyak early return campur aduk) — pecah jadi fungsi kecil bila perlu.
- **Tidak ada magic number/string berulang**: ekstrak ke konstanta bernama jika dipakai lebih dari sekali.
- **Error handling yang benar**: tidak ada `catch` kosong, error harus di-log atau di-propagate dengan jelas, tidak menelan exception secara diam-diam.
- **Tidak ada hardcoded secret/credential** di source code — semua secret harus lewat `.env`, jangan pernah menulis API key/token/password langsung di kode.
- **SQL aman**: gunakan parameterized query/ORM (Sequelize) — jangan pernah concat string untuk membangun query SQL (rawan SQL injection, juga akan diflag Sonar sebagai security hotspot).
- **Penamaan konsisten & jelas**: ikuti konvensi yang sudah ada di masing-masing folder (camelCase untuk variabel/fungsi JS/TS, PascalCase untuk komponen Vue/class).
- **Null/undefined safety**: cek null/undefined secara eksplisit sebelum akses properti, terutama di TypeScript — hindari `any` kalau bisa dihindari.
- **Tidak ada duplikasi blok kode**: jika logic yang sama muncul di ≥3 tempat, pertimbangkan ekstraksi ke helper/util — tapi jangan over-engineer untuk kasus yang cuma 1-2 kali dipakai.
- Sebelum melaporkan task selesai, jalankan lint/typecheck yang tersedia di masing-masing sub-project (`npm run lint`, `tsc --noEmit`, dsb.) jika ada, dan pastikan tidak menambah warning baru.

## 4. Cara menyikapi aturan di atas

Kalau sebuah permintaan user tampak akan menyentuh area di atas (baik langsung maupun sebagai efek samping), berhenti dulu dan tanyakan konfirmasi secara eksplisit ke user sebelum eksekusi — jangan asumsikan izin dari permintaan sebelumnya berlaku juga untuk permintaan baru.
