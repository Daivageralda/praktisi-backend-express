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
      }));
  
      // Result
      response(200, transformedData, 'Data Jadwal Berhasil Diambil', res);
    } catch (error) {
      console.error('Terjadi Kesalahan Saat Mengambil Data Matkul:', error);
      response(500, null, 'Kesalahan Pada Server Internal', res);
    }
};

module.exports = { getAllJadwal };
