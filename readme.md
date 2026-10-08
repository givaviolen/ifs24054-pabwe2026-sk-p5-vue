# Delcom Auction — VueJS (JavaScript)

> **Studi Kasus 1 · Praktikum 5 · Pengembangan Aplikasi Web (PABWE) 2026**
> Repositori: `{username}-pabwe2026-sk-p5-vue`

Aplikasi web lelang (auction) berbasis **Vue 3** yang terhubung ke **Delcom Open API**. Pengguna dapat mendaftar, masuk, membuat lelang barang, mengunggah cover, memberi tawaran (bid), serta mengelola profil. Seluruh logika aplikasi diuji dengan **Vitest** dengan target coverage **100%**.

---

## Daftar Isi

1. [Fitur Utama](#fitur-utama)
2. [Teknologi](#teknologi)
3. [Prasyarat](#prasyarat)
4. [Instalasi & Menjalankan Aplikasi](#instalasi--menjalankan-aplikasi)
5. [Konfigurasi Environment](#konfigurasi-environment)
6. [Skrip yang Tersedia](#skrip-yang-tersedia)
7. [Struktur Proyek](#struktur-proyek)
8. [Arsitektur](#arsitektur)
9. [Rute Aplikasi](#rute-aplikasi)
10. [Endpoint API yang Digunakan](#endpoint-api-yang-digunakan)
11. [Pengujian](#pengujian)
12. [Panduan Penamaan & Pengumpulan](#panduan-penamaan--pengumpulan)
13. [Pemecahan Masalah](#pemecahan-masalah)
14. [Referensi](#referensi)

---

## Fitur Utama

### Autentikasi
- Registrasi akun baru dan login dengan validasi form.
- Token disimpan di `localStorage` dan otomatis dikirim sebagai header `Authorization: Bearer <token>`.
- Notifikasi sukses/gagal/konfirmasi menggunakan SweetAlert2.

### Lelang (Delcom Auction)
- **Dashboard lelang** dengan tab filter: *Semua Lelang*, *Lelang Saya*, *Lelang Berlangsung*, *Lelang Ditutup*.
- **Pencarian langsung (live search)** berdasarkan judul/deskripsi.
- Kartu lelang menampilkan gambar cover, harga awal, tawaran tertinggi, dan status/countdown.
- **Tambah, ubah, dan hapus** lelang (judul, deskripsi markdown, harga awal, batas waktu penutupan).
- **Ganti cover** barang lelang dengan pratinjau langsung.
- **Ajukan tawaran (bid)** dengan validasi: nominal harus lebih tinggi dari tawaran tertinggi saat ini.
- **Batalkan tawaran** dan **hapus seluruh lelang milik pengguna**.
- Halaman detail: cover besar, deskripsi markdown, riwayat penawar, serta aksi pemilik (ubah/hapus/ganti cover).
- Deskripsi kaya menggunakan editor/viewer **Toast UI**.

### Pengguna & Profil
- Direktori seluruh pengguna.
- Ubah profil, unggah foto avatar, dan ganti kata sandi.

### Lainnya
- Tata letak responsif (sidebar berupa drawer pada layar kecil).
- Halaman **404 Not Found** untuk rute yang tidak dikenal.
- Format mata uang Rupiah (`formatRupiah`) dan format tanggal (`formatDate`).

---

## Teknologi

| Kategori | Teknologi |
|---|---|
| Runtime & package manager | [Bun](https://bun.sh) |
| Framework | Vue 3 (JavaScript) |
| Build tool | Vite |
| Routing | Vue Router |
| State management | Pinia |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Ikon | `lucide-vue-next` |
| Tipografi | Google Fonts — Plus Jakarta Sans |
| Dialog/notifikasi | SweetAlert2 |
| Editor markdown | `@toast-ui/editor` |
| Utilitas class | `clsx`, `tailwind-merge` |
| Pengujian | Vitest, jsdom, `@vue/test-utils`, `@testing-library/jest-dom`, `@vitest/coverage-v8` |

---

## Prasyarat

- [Bun](https://bun.sh) terpasang (`bun --version`).
- Git.
- Editor seperti Visual Studio Code.
- Koneksi internet (untuk mengakses Delcom Open API dan Google Fonts).

---

## Instalasi & Menjalankan Aplikasi

```bash
# 1. Clone repositori
git clone https://github.com/{username}/{username}-pabwe2026-sk-p5-vue.git
cd {username}-pabwe2026-sk-p5-vue

# 2. Pasang dependensi
bun install

# 3. Siapkan environment
cp .env.example .env

# 4. Jalankan mode pengembangan
bun run dev
```

Buka **http://localhost:3000** (port dapat diubah lewat `APP_PORT`).

Build produksi dan pratinjau:

```bash
bun run build
bun run preview
```

---

## Konfigurasi Environment

Salin `.env.example` menjadi `.env`, lalu sesuaikan nilainya.

| Variabel | Deskripsi | Nilai bawaan |
|---|---|---|
| `VITE_DELCOM_BASEURL` | Base URL Delcom Open API | `https://open-api.delcom.org/api/v1` |
| `APP_PORT` | Port server dev & preview | `3000` |

`vite.config.js` membaca variabel di atas dan mengekspos konstanta global `DELCOM_BASEURL` ke kode aplikasi (via `define`).

> `.env` sudah masuk `.gitignore`. Jangan meng-commit berkas ini; commit hanya `.env.example`.

---

## Skrip yang Tersedia

| Perintah | Fungsi |
|---|---|
| `bun run dev` | Menjalankan dev server Vite |
| `bun run build` | Membuat build produksi ke folder `dist/` |
| `bun run preview` | Pratinjau hasil build |
| `bun run test` | Menjalankan seluruh pengujian sekali jalan |
| `bun run test:watch` | Menjalankan pengujian dalam mode watch |
| `bun run test:coverage` | Menjalankan pengujian + laporan coverage (threshold 100%) |

---

## Struktur Proyek

Proyek memakai pola **feature-driven**: setiap fitur menyimpan API, state, layout, komponen, modal, dan halamannya sendiri.

```
.
├── public/
│   └── logo.svg
├── src/
│   ├── App.vue
│   ├── App.test.js
│   ├── main.js                 # Inisialisasi Vue, Pinia, Vue Router
│   ├── router.js               # Definisi rute
│   ├── index.css               # Tailwind CSS v4 + gaya dasar
│   ├── setupTests.js           # Setup jest-dom & mock DOM
│   ├── test-utils.js           # renderWithProviders, createMockPinia
│   ├── features/
│   │   ├── auth/
│   │   │   ├── api/authApi.js
│   │   │   ├── layouts/AuthLayout.vue
│   │   │   ├── pages/{LoginPage,RegisterPage}.vue
│   │   │   └── states/authStore.js
│   │   ├── aucations/
│   │   │   ├── api/aucationApi.js
│   │   │   ├── components/{NavbarComponent,SidebarComponent,MarkdownEditor,MarkdownViewer}.vue
│   │   │   ├── layouts/AucationLayout.vue
│   │   │   ├── modals/{AddModal,ChangeModal,ChangeCoverModal,BidModal}.vue
│   │   │   ├── pages/{HomePage,DetailPage}.vue
│   │   │   └── states/aucationsStore.js
│   │   ├── users/
│   │   │   ├── api/userApi.js
│   │   │   ├── pages/{UsersPage,ProfilePage}.vue
│   │   │   └── states/usersStore.js
│   │   └── common/
│   │       └── pages/NotFoundPage.vue
│   ├── helpers/
│   │   ├── apiHelper.js        # Wrapper fetch + token
│   │   └── toolsHelper.js      # SweetAlert2, formatRupiah, formatDate
│   └── hooks/
│       └── useInput.js         # Composable binding input form
├── .env
├── .env.example
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

> Setiap berkas sumber memiliki pasangan `*.test.js` di folder yang sama.

---

## Arsitektur

- **Helper** — `apiHelper.js` membungkus `fetch` (query params, header Bearer, penyimpanan token via `getAccessToken` / `putAccessToken`). `toolsHelper.js` berisi `showSuccessDialog`, `showErrorDialog`, `showConfirmDialog`, `formatRupiah`, dan `formatDate`.
- **Hook** — `useInput.js` mengelola state input dan handler perubahan secara reusable.
- **API layer** (`features/*/api`) — fungsi murni pemanggil endpoint, tanpa state UI.
- **Store Pinia** (`features/*/states`) — memegang state dan aksi asinkron. Contoh state pada `aucationsStore`:
  - Data: `aucations`, `aucation`, `isAucation`.
  - Status mutasi: `isAucationAdd/Added`, `isAucationChange/Changed`, `isAucationChangeCover/ChangedCover`, `isAucationDelete/Deleted`, `isBidAdd/Added`, `isBidDelete/Deleted`, `isAucationDeleteAll/DeletedAll`.
- **Layout** — `AuthLayout` untuk halaman autentikasi; `AucationLayout` menggabungkan navbar, sidebar, dan `<RouterView />`.
- **Pages / Modals / Components** — lapisan presentasi yang membaca store dan memicu aksi.

---

## Rute Aplikasi

| Path | Layout | Halaman |
|---|---|---|
| `/auth/login` | `AuthLayout` | Login |
| `/auth/register` | `AuthLayout` | Registrasi |
| `/` | `AucationLayout` | Home — daftar & filter lelang |
| `/aucations/:aucationId` | `AucationLayout` | Detail lelang & riwayat tawaran |
| `/users` | `AucationLayout` | Direktori pengguna |
| `/profile` | `AucationLayout` | Profil & pengaturan akun |
| `/:pathMatch(.*)*` | — | 404 Not Found |

---

## Endpoint API yang Digunakan

Base URL: `https://open-api.delcom.org/api/v1`
Dokumentasi lelang: <https://open-api.delcom.org/docs/1.0/api-aucations>

### Autentikasi
| Method | Endpoint | Fungsi |
|---|---|---|
| POST | `/auth/login` | Login |
| POST | `/auth/register` | Registrasi akun |

### Pengguna
| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/users` | Daftar pengguna |
| GET | `/users/me` | Profil pengguna aktif |
| PUT | `/users/me` | Ubah profil |
| POST | `/users/me/photo` | Unggah foto avatar |
| PUT | `/users/me/password` | Ganti kata sandi |

### Lelang
| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/aucations` | Daftar lelang (filter: `is_me`, `is_closed`) |
| GET | `/aucations/:id` | Detail lelang |
| POST | `/aucations` | Tambah lelang (`title`, `description`, `start_bid`, `closed_at`) |
| PUT | `/aucations/:id` | Ubah lelang |
| POST | `/aucations/:id/cover` | Unggah/ganti cover |
| DELETE | `/aucations/:id` | Hapus lelang |
| POST | `/aucations/:id/bids` | Ajukan tawaran |
| DELETE | `/aucations/:id/bids` | Batalkan tawaran |
| DELETE | `/aucations` | Hapus seluruh lelang milik pengguna |

---

## Pengujian

Pengujian memakai **Vitest** (`environment: jsdom`, `globals: true`) dengan provider coverage **v8**.

```bash
bun run test:coverage
```

- Reporter coverage: `text`, `json`, `html`, `lcov` (laporan HTML ada di `coverage/index.html`).
- **Threshold wajib 100%** untuk `lines`, `functions`, `branches`, dan `statements`; pengujian dianggap gagal jika ada yang kurang.
- Dikecualikan dari coverage: `src/main.js`, `src/setupTests.js`, `src/test-utils.js`, berkas `*.test.*`, `node_modules/`, dan `.docs/`.

Cakupan pengujian: helper, hook, API caller, Pinia store, komponen, modal, layout, halaman, dan integrasi `App.test.js`.

Utilitas pengujian di `src/test-utils.js`:
- `renderWithProviders` — me-render komponen dengan Pinia dan router memory history.
- `createMockPinia` — membuat store Pinia tiruan untuk isolasi pengujian.

---

## Panduan Penamaan & Pengumpulan

- Nama proyek dan repositori GitHub: `{username}-pabwe2026-sk-p5-vue`
  Contoh: `ifs18005-pabwe2026-sk-p5-vue` atau `abdullah_ubaid-pabwe2026-sk-p5-vue`.
- Ganti field `"name"` pada `package.json` sesuai nama proyek.
- Pastikan `bun run test:coverage` menghasilkan **100%** pada seluruh metrik sebelum dikumpulkan.

---

## Pemecahan Masalah

| Masalah | Solusi |
|---|---|
| Port 3000 sudah dipakai | Ubah `APP_PORT` di `.env`, lalu jalankan ulang `bun run dev` |
| Request API gagal / 401 | Pastikan sudah login dan `VITE_DELCOM_BASEURL` benar; hapus token lama di `localStorage` lalu login ulang |
| Perubahan `.env` tidak terbaca | Hentikan dev server, lalu jalankan ulang |
| Coverage di bawah 100% | Buka `coverage/index.html` dan lengkapi pengujian pada baris/cabang yang belum tercakup |
| Gagal `bun install` | Hapus `node_modules` dan `bun.lock`, lalu pasang ulang |

---

## Referensi

- Vue: <https://vuejs.org/guide/quick-start.html>
- Delcom Open API — Auctions: <https://open-api.delcom.org/docs/1.0/api-aucations>
- Tailwind CSS v4: <https://tailwindcss.com>
- Pinia: <https://pinia.vuejs.org>
- Vitest: <https://vitest.dev>

---

## Penulis

- **Nama**: _isi nama kamu_
- **Username**: `{username}`
- **Mata kuliah**: Pengembangan Aplikasi Web (PABWE) 2026 — Praktikum 5