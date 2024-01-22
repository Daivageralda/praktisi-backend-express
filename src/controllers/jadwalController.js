const Jadwal = require('../models/jadwalModel')
const Matkul = require('../models/matkulModel')
const response = require('../utils/payload')

// Define Relationship
require('../models/association')

// Get Method
const getAllJadwal = async (req, res) => {
  try {
    const jadwals = await Jadwal.findAll({
      include: [
        { model: Matkul,
          attributes: ['nama_matkul']}
        ]
  })

    // Transforming Structure Result
    const transformedData = jadwals.map((jadwal) => ({
        kd_jadwal: jadwal.kd_jadwal,
        tanggal: jadwal.tanggal,
        waktu_mulai: jadwal.waktu_mulai,
        waktu_selesai: jadwal.waktu_selesai,
        kelas: jadwal.kelas,
        ruangan: jadwal.ruangan,
        kd_matkul: jadwal.kd_matkul,
        nama_matkul: jadwal.Matkul ? jadwal.Matkul.nama_matkul : null
      }))
  
      // Result
      response(200, transformedData, 'Data Jadwal Berhasil Diambil', res)
    } catch (error) {
      console.error('Terjadi Kesalahan Saat Mengambil Data Matkul:', error)
      response(500, null, 'Kesalahan Pada Server Internal', res)
    }
}

// Method POST
const createJadwal = async (req, res) => {
  try {
    // Mendapatkan data dari body request
    const { kd_jadwal, tanggal, waktu_mulai, waktu_selesai, kelas, ruangan, kd_matkul } = req.body

    // Membuat data baru menggunakan model Jadwal
    const newJadwal = await Jadwal.create({
      kd_jadwal,
      tanggal,
      waktu_mulai,
      waktu_selesai,
      kelas,
      ruangan,
      kd_matkul,
    })

    // Reload untuk memuat relasi Matkul
    await newJadwal.reload({ include: [{ model: Matkul, attributes: ['nama_matkul'] }] })

    // Transforming Structure Result
    const transformedData = {
      kd_jadwal: newJadwal.kd_jadwal,
      tanggal: newJadwal.tanggal,
      waktu_mulai: newJadwal.waktu_mulai,
      waktu_selesai: newJadwal.waktu_selesai,
      kelas: newJadwal.kelas,
      ruangan: newJadwal.ruangan,
      kd_matkul: newJadwal.kd_matkul,
      nama_matkul: newJadwal.Matkul ? newJadwal.Matkul.nama_matkul : null,
    }

    // Result
    response(201, transformedData, 'Jadwal Berhasil Dibuat', res)
  } catch (error) {
    console.error('Terjadi Kesalahan Saat Menambah Jadwal:', error)
    response(500, null, 'Kesalahan Pada Server Internal', res)
  }
}

// Method PUT
const updateJadwal = async (req, res) => {
  try {
    // Mendapatkan data dari body request
    const { kd_jadwal, tanggal, waktu_mulai, waktu_selesai, kelas, ruangan, kd_matkul } = req.body

    // Mencari data Jadwal berdasarkan kd_jadwal
    const jadwalToUpdate = await Jadwal.findOne({ where: { kd_jadwal } })

    // Jika data Jadwal tidak ditemukan
    if (!jadwalToUpdate) {
      return response(404, null, 'Jadwal Tidak Ditemukan', res)
    }

    // Memperbarui data Jadwal
    await jadwalToUpdate.update({
      tanggal,
      waktu_mulai,
      waktu_selesai,
      kelas,
      ruangan,
      kd_matkul,
    })

    // Reload untuk memuat relasi Matkul
    await jadwalToUpdate.reload({ include: [{ model: Matkul, attributes: ['nama_matkul'] }] })

    // Transforming Structure Result
    const transformedData = {
      kd_jadwal: jadwalToUpdate.kd_jadwal,
      tanggal: jadwalToUpdate.tanggal,
      waktu_mulai: jadwalToUpdate.waktu_mulai,
      waktu_selesai: jadwalToUpdate.waktu_selesai,
      kelas: jadwalToUpdate.kelas,
      ruangan: jadwalToUpdate.ruangan,
      kd_matkul: jadwalToUpdate.kd_matkul,
      nama_matkul: jadwalToUpdate.Matkul ? jadwalToUpdate.Matkul.nama_matkul : null,
    }

    // Result
    response(200, transformedData, 'Jadwal Berhasil Diperbarui', res)
  } catch (error) {
    console.error('Terjadi Kesalahan Saat Memperbarui Jadwal:', error)
    response(500, null, 'Kesalahan Pada Server Internal', res)
  }
}

// Method DELETE
const deleteJadwal = async (req, res) => {
  try {
    // Mendapatkan nilai kd_jadwal dari parameter URL
    const { kd_jadwal } = req.params;

    // Menghapus data Jadwal berdasarkan kd_jadwal
    const deletedJadwal = await Jadwal.destroy({
      where: { kd_jadwal },
    });

    // Jika data berhasil dihapus
    if (deletedJadwal) {
      response(200, null, 'Data Jadwal Berhasil Dihapus', res);
    } else {
      response(404, null, 'Data Jadwal Tidak Ditemukan', res);
    }
  } catch (error) {
    console.error('Terjadi Kesalahan Saat Menghapus Jadwal:', error);
    response(500, null, 'Kesalahan Pada Server Internal', res);
  }
};

module.exports = { getAllJadwal, createJadwal, updateJadwal, deleteJadwal }