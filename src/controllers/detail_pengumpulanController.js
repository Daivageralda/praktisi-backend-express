const DetailPengumpulan = require('../models/detail_pengumpulanModel')
const Tugas = require('../models/tugasModel')
const Matkul = require('../models/matkulModel')
const User = require('../models/userModel')
const response = require('../utils/payload')

// Define Relationship
require('../models/association')

// Get Method
const getAllDetailPengumpulan = async (req, res) => {
  try {
    const detailpengumpulan = await DetailPengumpulan.findAll({
      include: [
        { model: User,
          attributes: ['nama']},
        {
            model: Tugas,
            attributes: ['kd_matkul'],
            include: [{
                model: Matkul,
                attributes: ['nama_matkul']
            }]
        }
        ]
  })

    // Transforming Structure Result
    const transformedData = detailpengumpulan.map((detailPengumpulan) => ({
        kd_tugas: detailPengumpulan.kd_tugas,
        nim: detailPengumpulan.usersid,
        nama: detailPengumpulan.User ? detailPengumpulan.User.nama : null,
        matkul: detailPengumpulan.Tugas ? detailPengumpulan.Tugas.Matkul.nama_matkul : null,
        tanggal_dikumpul: detailPengumpulan.tanggal_dikumpul.toLocaleString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        file_tugas: detailPengumpulan.file_tugas,
        nilai_tugas : detailPengumpulan.nilai_tugas
      }));
  
      // Result
      response(200, transformedData, 'Data Pengumpulan Berhasil Diambil', res);
    } catch (error) {
      console.error('Terjadi Kesalahan Saat Mengambil Data Pengumpulan:', error);
      response(500, null, 'Kesalahan Pada Server Internal', res);
    }
};

module.exports = { getAllDetailPengumpulan };
