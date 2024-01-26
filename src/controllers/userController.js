const User = require('../models/userModel')
const Matkul = require('../models/matkulModel')
const response = require('../utils/payload')

//Define Relationship
require('../models/association')

// Function to Handle Errors
const handleErrors = require('../utils/handlingError')

//Get Method
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Matkul,
          attributes: ['nama_matkul'],
          as: 'pengajar',
        },
      ],
    })

    const transformedData = users.map((user) => {
      let roleInfo = {}
      if (user.praktikan && user.asisten_laboratorium && user.userid.length == 10){
        roleInfo = {
          status: "asisten_laboratorium dan praktikan",
          matkul: user.pengajar ? user.pengajar.nama_matkul : null,
        }
      }  else if (user.praktikan && user.userid.length == 10) {
        roleInfo = {
          status: "praktikan"
        }
      } else if (user.asisten_laboratorium) {
        roleInfo = {
          status: "asisten_laboratorium",
          matkul: user.pengajar ? user.pengajar.nama_matkul : null,
        }
      }
      else if (user.dosen && user.userid.length > 10) {
        roleInfo = {
          status: "dosen",
          matkul: user.pengajar ? user.pengajar.nama_matkul : null,
        }
      }

      return {
        userid: user.userid,
        password: user.password,
        nama: user.nama,
        email: user.email,
        semester: user.semester,
        ...roleInfo,
      }
    })

    response(200, transformedData, 'Data User Berhasil Diambil', res)
  } catch (error) {
    handleErrors(error, res)
  }
}

module.exports = { getAllUsers }
