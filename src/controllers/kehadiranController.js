const Kehadiran = require('../models/kehadiranModel')
const Jadwal = require('../models/jadwalModel')
const Matkul = require('../models/matkulModel')
const User = require('../models/userModel')
const response = require('../utils/payload')

// Define Relationship
require('../models/association')

// Get Method
const getAllKehadiran = async (req, res) => {
  try {
    const kehadiran = await Kehadiran.findAll({
      include: [
        { model: User,
          attributes: ['nama']},
        {
            model: Jadwal,
            attributes: ['kd_matkul'],
            include: [{
                model: Matkul,
                attributes: ['nama_matkul']
            }]
        }
        ]
  })

    // Transforming Structure Result
    const transformedData = kehadiran.map((kehadiran) => ({
        kd_jadwal: kehadiran.kd_jadwal,
        nim: kehadiran.usersid,
        nama: kehadiran.User ? kehadiran.User.nama : null,
        nama_matkul: kehadiran.Jadwal.Matkul ? kehadiran.Jadwal.Matkul.nama_matkul : null,
        pertemuan: kehadiran.pertemuan,
        materi: kehadiran.materi,
        tanggal: kehadiran.tanggal.toLocaleString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        status: kehadiran.status,
        keterangan: kehadiran.keterangan
      }));
  
      // Result
      response(200, transformedData, 'Data Kehadiran Berhasil Diambil', res);
    } catch (error) {
      console.error('Terjadi Kesalahan Saat Mengambil Data Kehadiran:', error);
      response(500, null, 'Kesalahan Pada Server Internal', res);
    }
};

module.exports = { getAllKehadiran };
