const NilaiAkhir = require('../models/nilai_akhirModel')
const User = require('../models/userModel')
const Matkul = require('../models/matkulModel')
const response = require('../utils/payload')

// Define Relationship
require('../models/association')

// Get Method
const getAllNilaiAkhir = async (req, res) => {
  try {
    const nilaiAkhir = await NilaiAkhir.findAll({
      include: [{
        model: User,
        attributes: ['nama']
      },{
        model: Matkul,
        attributes: ['nama_matkul']
      }
        ]
  })

    // Transforming Structure Result
    const transformedData = nilaiAkhir.map((nilaiakhir) => ({
        nim: nilaiakhir.usersid,
        nama: nilaiakhir.User ? nilaiakhir.User.nama : null,
        matkul_prak: nilaiakhir.Matkul ? nilaiakhir.Matkul.nama_matkul : null,
        nilai_akhir: nilaiakhir.nilai_akhir
      }));
  
      // Result
      response(200, transformedData, 'Data Nilai Berhasil Diambil', res);
    } catch (error) {
      console.error('Terjadi Kesalahan Saat Mengambil Data Nilai:', error);
      response(500, null, 'Kesalahan Pada Server Internal', res);
    }
};

module.exports = { getAllNilaiAkhir };
