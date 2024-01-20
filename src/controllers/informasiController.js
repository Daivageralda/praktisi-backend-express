const Informasi = require('../models/informasiModel')
const User = require('../models/userModel')
const response = require('../utils/payload')

// Define Relationship
require('../models/association')

// Get Method
const getAllInformasi = async (req, res) => {
  try {
    const informasi = await Informasi.findAll({
      include: [
        { model: User,
          attributes: ['nama']}
        ]
  })

    // Transforming Structure Result
    const transformedData = informasi.map((informasi) => ({
        kd_informasi: informasi.kd_informasi,
        tanggal: informasi.tanggal.toLocaleString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        judul_informasi: informasi.judul_informasi,
        deskripsi_informasi: informasi.deskripsi_informasi,
        tautan: informasi.tautan,
        userid: informasi.usersid,
        nama_pembuat: informasi.User ? informasi.User.nama : null,
      }));
  
      // Result
      response(200, transformedData, 'Data Informasi Berhasil Diambil', res);
    } catch (error) {
      console.error('Terjadi Kesalahan Saat Mengambil Data Informasi:', error);
      response(500, null, 'Kesalahan Pada Server Internal', res);
    }
};

module.exports = { getAllInformasi };
