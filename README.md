# Sistem Katalog Lelang Aset IT

Sistem web untuk mengelola katalog lelang aset IT dengan panel admin lengkap.

## Fitur Utama

### 📋 Katalog Publik
- Tampilan katalog produk yang menarik dan responsif
- Filter berdasarkan kategori (Macbook, Thinkpad, Ideapad, Acer)
- Pencarian produk berdasarkan spesifikasi dan kondisi
- Modal detail produk dengan informasi lengkap
- Integrasi WhatsApp untuk penawaran langsung
- Galeri foto produk (jika ada)

### 🛠️ Panel Admin
- Login sederhana untuk keamanan
- Dashboard dengan statistik lengkap
- CRUD Produk (Create, Read, Update, Delete)
- Upload foto produk (maks 5 foto, 2MB per foto)
- Export data ke CSV
- Pagination dan filter pada halaman produk

### 💾 Database
- Menggunakan IndexedDB untuk penyimpanan lokal
- Data tersimpan di browser, tidak memerlukan server
- Backup data otomatis saat browser ditutup

## Struktur Folder

```
katalog-lelang/
├── admin/                    # Halaman admin
│   ├── login.html           # Halaman login admin
│   ├── dashboard.html       # Dashboard statistik
│   ├── products.html        # Daftar produk
│   ├── add-product.html     # Tambah produk baru
│   └── edit-product.html    # Edit produk
├── database/                # File database
│   └── db.js              # Konfigurasi IndexedDB
├── assets/                  # Asset statis
│   ├── images/             # Folder untuk foto produk
│   ├── js/                 # File JavaScript
│   └── css/                # File CSS
└── kataloglelang.html      # Halaman katalog publik
```

## Cara Instalasi

1. Download atau clone semua file
2. Pastikan semua folder dan file sudah ada
3. Buka `kataloglelang.html` di browser untuk melihat katalog
4. Buka `admin/login.html` di browser untuk mengakses panel admin

## Cara Penggunaan

### Mengakses Panel Admin
1. Buka `admin/login.html`
2. Masukkan password: `admin123`
3. Klik tombol Login

### Menambah Produk
1. Login ke panel admin
2. Klik menu "Tambah Produk" atau buka `admin/add-product.html`
3. Isi semua form yang diperlukan
4. Upload foto produk (opsional)
5. Klik "Simpan Produk"

### Mengedit Produk
1. Dari halaman produk, klik ikon edit
2. Ubah informasi yang diperlukan
3. Klik "Update Produk"

### Menghapus Produk
1. Dari halaman produk, klik ikon trash
2. Konfirmasi penghapusan
3. Produk akan dihapus dari database

## Integrasi WhatsApp

Semua penawaran produk melalui katalog akan diarahkan ke:
- Nomor WhatsApp: 081553821808
- Format pesan otomatis dengan detail produk

## Teknologi yang Digunakan

- **Frontend**: HTML5, CSS3, Tailwind CSS, JavaScript (ES6+)
- **Database**: IndexedDB (Browser Storage)
- **Icons**: Font Awesome 6
- **Fonts**: Google Fonts (Inter)

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 14+
- Edge 79+

## Keamanan

- Panel admin dilindungi dengan password
- Validasi input pada semua form
- Filter file upload untuk keamanan
- Ukuran file dibatasi maks 2MB

## Backup Data

Karena menggunakan IndexedDB, data tersimpan di browser lokal. Untuk backup:
1. Gunakan fitur Export di halaman products
2. Data akan diunduh dalam format CSV
3. Simpan file CSV untuk backup

## Troubleshooting

### Data tidak muncul
- Pastikan browser mendukung IndexedDB
- Coba refresh halaman
- Periksa console browser untuk error

### Foto tidak upload
- Pastikan ukuran file maks 2MB
- Format yang didukung: JPG, PNG, GIF
- Maksimal 5 foto per produk

### Login gagal
- Pastikan password: `admin123`
- Clear browser cache jika perlu

## Customization

### Mengubah Password Admin
Edit file `admin/login.html`, baris:
```javascript
const ADMIN_PASSWORD = 'admin123';
```

### Mengubah Nomor WhatsApp
Edit file `kataloglelang.html`, baris:
```javascript
const phoneNumber = '6281553821808';
```

### Menambah Kategori
1. Edit database filter di `kataloglelang.html`
2. Tambah opsi di form admin
3. Update logic kategori

## Lisensi

MIT License - Free untuk digunakan dan dimodifikasi

## Support

Untuk bantuan atau pertanyaan, hubungi melalui WhatsApp: 081553821808