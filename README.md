# Deteksi Berita Hoax
Proyek ini adalah Aplikasi Web Front-end yang berfungsi sebagai antarmuka pengguna (UI) untuk model Machine Learning (ML) yang bertugas mendeteksi apakah suatu berita atau teks klaim adalah hoax (palsu) atau fakta (valid).

Tujuan: Menyediakan alat bantu yang cepat dan mudah diakses untuk verifikasi awal klaim atau berita yang meragukan.

🌟 Fitur Utama
Input Teks Dinamis: Pengguna dapat memasukkan teks berita (judul dan isi) yang ingin diverifikasi.

Integrasi API ML: Aplikasi berkomunikasi secara asinkron dengan server back-end (tempat model ML di-deploy) untuk memproses teks.

Tampilan Hasil Klasifikasi: Menyajikan hasil prediksi (Hoax/Fakta) dan tingkat keyakinan (probabilitas) model dengan visualisasi yang jelas.

Antarmuka Responsif: Desain dioptimalkan untuk perangkat desktop dan mobile.

🖥️ Panduan Penggunaan Aplikasi (Untuk User)
Pengguna hanya perlu mengikuti tiga langkah sederhana untuk memverifikasi berita:

Langkah 1: Masukkan Teks Berita
Salin dan tempel (copy-paste) seluruh isi berita atau klaim yang ingin Anda verifikasi ke dalam kolom input teks di aplikasi.

Langkah 2: Proses dan Kirim
Klik tombol "Cek Hoax" atau "Verifikasi" untuk mengirimkan data ke model pemrosesan.

Langkah 3: Interpretasi Hasil
Hasil prediksi akan muncul di layar. Jika hasilnya HOAX, jangan sebarkan informasi tersebut. Jika hasilnya FAKTA, informasi tersebut dianggap valid oleh model, namun tetap disarankan untuk verifikasi silang.

| Hasil Prediksi | Tindakan yang Harus Dilakukan User | Kategori |
|----------------|-------------------------------------|----------|
| (contoh: Info A) |Model AI memprediksi bahwa konten berita ini konsisten dengan pola berita FAKTA. Namun, tetaplah kritis dan verifikasi sumbernya. | FAKTA / VALID |
| (contoh: Info B) | Model AI memprediksi berita ini sebagai HOAX. Pastikan untuk memeriksa kembali informasi ini melalui sumber-sumber resmi atau situs pencari fakta. | HOAX / PALSU |


⚙️ Alur Proses Deteksi
Berikut adalah ilustrasi bagaimana data yang Anda masukkan diproses dari front-end hingga mendapatkan hasil prediksi:
<img width="1024" height="486" alt="Gemini_Generated_Image_eqyn27eqyn27eqyn" src="https://github.com/user-attachments/assets/2cedd8e2-891b-4df9-9202-fc80e7dce43c" />
