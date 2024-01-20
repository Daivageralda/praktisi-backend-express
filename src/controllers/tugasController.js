const Tugas = require('../models/tugasModel')
const Matkul = require('../models/matkulModel')
const response = require('../utils/payload')

// Define Relationship
require('../models/association')

// Get Method
const getAllTugas = async (req, res) => {
  try {
    const tugas = await Tugas.findAll({
      include: [
        { model: Matkul,
          attributes: ['nama_matkul']}
        ]
  })

    // Transforming Structure Result
    const transformedData = tugas.map((tugas) => ({
        kd_tugas: tugas.kd_tugas,
        jenis_tugas: tugas.jenis_tugas,
        deskripsi_tugas: tugas.deskripsi_tugas,
        tanggal_dibuat: tugas.tanggal_dibuat.toLocaleString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        tanggal_pengumpulan: tugas.tanggal_pengumpulan.toLocaleString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        kd_matkul: tugas.kd_matkul,
        nama_matkul: tugas.Matkul ? tugas.Matkul.nama_matkul : null
      }));
  
      // Result
      response(200, transformedData, 'Data Tugas Berhasil Diambil', res);
    } catch (error) {
      console.error('Terjadi Kesalahan Saat Mengambil Data Tugas:', error);
      response(500, null, 'Kesalahan Pada Server Internal', res);
    }
};

module.exports = { getAllTugas };
