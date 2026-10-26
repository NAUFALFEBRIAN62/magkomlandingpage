export const LOGIN_URL = "/login";
export const DAFTAR_URL = "/register";

export const persyaratan = [
  "Siswa SMK aktif atau mahasiswa aktif D3/D4/S1 dengan jurusan yang relevan",
  "Bersedia magang secara luring (WFO) di kantor Diskominfo Sleman",
  "Mengikuti jadwal dan durasi magang yang telah ditentukan",
];

export const dokumen = [
  "Surat Pengantar Sekolah / Perguruan Tinggi",
  "Curriculum Vitae (CV)",
  "Transkrip / Rapor Nilai Terakhir",
  "Pas Foto",
];

export type Jenjang = "smk" | "mahasiswa";
export type Bulan = "Nov" | "Des" | "Jan";
export const bulanList: Bulan[] = ["Nov", "Des", "Jan"];

export type Bidang = { id: string; nama: string; ikon: string; jurusan: string[]; kegiatan: string };

export const bidangList: Bidang[] = [
  { id: "aptika", nama: "Aplikasi Informatika", ikon: "</>", jurusan: ["RPL", "Informatika", "Sistem Informasi"], kegiatan: "Mengembangkan dan merawat aplikasi layanan publik Pemkab Sleman." },
  { id: "statistik", nama: "Statistik", ikon: "∑", jurusan: ["Statistika", "Matematika", "Informatika"], kegiatan: "Mengolah data sektoral dan menyusun visualisasi Satu Data Sleman." },
  { id: "sandi", nama: "Persandian", ikon: "🔒", jurusan: ["TKJ", "Teknik Komputer", "Keamanan Siber"], kegiatan: "Membantu pengamanan jaringan dan sertifikat elektronik." },
  { id: "sekretariat", nama: "Sekretariat", ikon: "✉", jurusan: ["OTKP", "Administrasi", "Manajemen"], kegiatan: "Mendukung administrasi persuratan dan arsip dinas." },
];

export type Slot = { sisa: number; total: number };

export const kuota: Record<Jenjang, Record<Bulan, Record<string, Slot>>> = {
  smk: {
    Nov: { aptika: { sisa: 4, total: 5 }, statistik: { sisa: 1, total: 4 }, sandi: { sisa: 3, total: 3 }, sekretariat: { sisa: 0, total: 3 } },
    Des: { aptika: { sisa: 5, total: 5 }, statistik: { sisa: 2, total: 4 }, sandi: { sisa: 1, total: 3 }, sekretariat: { sisa: 2, total: 3 } },
    Jan: { aptika: { sisa: 2, total: 5 }, statistik: { sisa: 4, total: 4 }, sandi: { sisa: 3, total: 3 }, sekretariat: { sisa: 3, total: 3 } },
  },
  mahasiswa: {
    Nov: { aptika: { sisa: 3, total: 6 }, statistik: { sisa: 5, total: 6 }, sandi: { sisa: 0, total: 3 }, sekretariat: { sisa: 2, total: 3 } },
    Des: { aptika: { sisa: 1, total: 6 }, statistik: { sisa: 3, total: 6 }, sandi: { sisa: 2, total: 3 }, sekretariat: { sisa: 3, total: 3 } },
    Jan: { aptika: { sisa: 6, total: 6 }, statistik: { sisa: 6, total: 6 }, sandi: { sisa: 3, total: 3 }, sekretariat: { sisa: 1, total: 3 } },
  },
};

export function statusKuota(k: Slot): "tersedia" | "hampir" | "penuh" {
  if (k.sisa <= 0) return "penuh";
  if (k.sisa / k.total <= 0.34) return "hampir";
  return "tersedia";
}

export const tahapan = [
  { judul: "Registrasi", isi: "Calon peserta membuat akun, mengisi data pribadi, dan menunggu akun diverifikasi admin.", kata: "Pertama", ringkas: "calon peserta membuat akun, mengisi data pribadi, dan menunggu verifikasi akun oleh admin." },
  { judul: "Administrasi & Seleksi", isi: "Pilih bidang, unggah berkas, lalu admin memverifikasi dan menyeleksi dalam 1–3 hari kerja.", kata: "Kedua", ringkas: "calon peserta memilih bidang dan mengunggah berkas, lalu admin melakukan verifikasi dan seleksi. Hasilnya diumumkan di portal MAGKOM." },
  { judul: "Pelaksanaan Magang", isi: "Kerjakan tugas, isi logbook harian, dan unggah progres sesuai durasi magang.", kata: "Ketiga", ringkas: "peserta melaksanakan magang, mengerjakan tugas, dan mengisi logbook sesuai durasi yang ditentukan." },
  { judul: "Kelulusan", isi: "Unduh Lembar Nilai Magang dan sertifikat dalam bentuk PDF dari portal.", kata: "Keempat", ringkas: "setelah magang selesai, peserta mendapatkan lembar nilai dan sertifikat yang dapat diunduh." },
];

export const faqList = [
  { q: "Apakah saya bisa mendaftar lebih dari satu bidang?", a: "Tidak. Setiap peserta hanya dapat memilih satu bidang dalam satu periode magang." },
  { q: "Bagaimana cara saya mendaftarkan diri?", a: "Klik tombol Daftar, buat akun, lengkapi data diri, lalu pilih bidang dan unggah berkas yang diminta." },
  { q: "Apa saja bidang yang tersedia di MAGKOM?", a: "Aplikasi Informatika, Statistik, Persandian, dan Sekretariat. Lihat sisa kuotanya di bagian Kuota per Bidang." },
  { q: "Berapa lama durasi magang?", a: "Durasi magang mengikuti surat pengantar dari sekolah atau kampus, umumnya 1 sampai 3 bulan." },
  { q: "Mengapa saya tidak mendapatkan email verifikasi?", a: "Periksa folder spam atau promosi. Jika tetap tidak ada, hubungi admin melalui kontak di bagian bawah halaman." },
  { q: "Apakah magang ini dibayar?", a: "Magang di Diskominfo Sleman tidak berbayar dan tidak memungut biaya apa pun." },
  { q: "Apakah magang bisa dilakukan dari rumah (WFH)?", a: "Tidak. Magang dilaksanakan secara luring di kantor Diskominfo Sleman." },
  { q: "Kapan sertifikat magang bisa diunduh?", a: "Setelah magang selesai dan nilai diinput pembimbing, sertifikat dapat diunduh dari portal MAGKOM." },
];
