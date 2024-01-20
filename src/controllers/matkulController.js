const Matkul = require('../models/matkulModel')
const User = require('../models/userModel')
const response = require('../utils/payload')

// Define Relationship
require('../models/association')

// Get Method
const getAllMatkul = async (req, res) => {
  try {
    const matkuls = await Matkul.findAll({
      include: [
        { model: User,
          attributes: ['nama'],
          as: 'aslab' },
        { model: User,
          attributes: ['nama'],
          as: 'dosen'
    }]
  })

    // Mapping
    const transformedData = matkuls.map((matkul) => ({
      kd_matkul: matkul.kd_matkul,
      nama_matkul: matkul.nama_matkul,
      userid: matkul.userid,
      aslab: matkul.aslab.map((aslab) => aslab.nama),
      dosen_pengampu: matkul.dosen ? matkul.dosen.nama : null
    }));

    // Result
    response(200, transformedData, 'Data Matkul Berhasil Diambil', res);
  } catch (error) {
    console.error('Terjadi Kesalahan Saat Mengambil Data Matkul:', error);
    response(500, null, 'Kesalahan Pada Server Internal', res);
  }
};

module.exports = { getAllMatkul };
