const User = require('../models/userModel')
const Matkul = require('../models/matkulModel')
const response = require('../utils/payload')

//Define Relationship
require('../models/association')

//Get Method
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          // Dosen
          model: Matkul,
          attributes: ['nama_matkul'],
          as: 'mengampu'
        },
        {
          // Aslab
          model: Matkul,
          attributes: ['nama_matkul'],
          as: 'pengajar'
        },
      ],
    })

    // Result
    response(200, users, 'Data pengguna berhasil diambil', res)
  } catch (error) {
    console.error('Error fetching users:', error)
    response(500, null, 'Internal Server Error', res)
  }
};

module.exports = { getAllUsers };
