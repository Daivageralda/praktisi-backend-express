const Matkul = require('../models/matkulModel')
const User = require('../models/userModel')
const response = require('../utils/payload')

// Define Relationship
require('../models/association')

// Function to Handle Errors
const handleErrors = require('../utils/handlingError')

// Get Method
const getAllMatkul = async (req, res) => {
  try {
    const matkuls = await Matkul.findAll({
      include: [
        { model: User, attributes: ['nama', 'dosen', 'asisten_laboratorium'], as: 'pengajar' },
      ],
    })

    const transformedData = matkuls.map((matkul) => {
      const aslab = matkul.pengajar
        .filter((pengajar) => pengajar.asisten_laboratorium)
        .map((pengajar) => pengajar.nama)

      const dosenPengampu = matkul.pengajar
      .filter((pengajar) => pengajar.dosen)
      .map((pengajar) => pengajar.nama)

      return {
        kd_matkul: matkul.kd_matkul,
        nama_matkul: matkul.nama_matkul,
        aslab: aslab,
        dosen_pengampu: dosenPengampu,
      }
    })

    response(200, transformedData, 'Data User Berhasil Diambil', res)
  } catch (error) {
    handleErrors(error, res)
  }
}

// POST Method
const createMatkul = async (req, res) => {
  try {
    const { kd_matkul, nama_matkul} = req.body

    const newMatkul = await Matkul.create({
      kd_matkul,
      nama_matkul
    })

    await newMatkul.reload()

    const transformedData = {
      kd_matkul: newMatkul.kd_matkul,
      nama_matkul: newMatkul.nama_matkul,
    }

    response(201, transformedData, 'Matkul Berhasil Dibuat', res)
  } catch (error) {
    handleErrors(error, res)
  }
}

// Method PUT
const updateMatkul = async (req, res) => {
  try {
    const { kd_matkul, nama_matkul } = req.body

    const matkulToUpdate = await Matkul.findOne({ where: { kd_matkul } })

    if (!matkulToUpdate) {
      return response(404, null, 'Matkul Tidak Ditemukan', res)
    }

    await matkulToUpdate.update({
      nama_matkul
    })

    await matkulToUpdate.reload()

    const transformedData = {
      kd_matkul: matkulToUpdate.kd_matkul,
      nama_matkul: matkulToUpdate.nama_matkul,
    }

    response(200, transformedData, 'Matkul Berhasil Diperbarui', res)
  } catch (error) {
    handleErrors(error, res)
  }
}

// Method DELETE
const deleteMatkul = async (req, res) => {
  try {
    const { kd_matkul } = req.params;

    const deletedMatkul = await Matkul.destroy({
      where: { kd_matkul },
    });

    if (deletedMatkul) {
      response(200, null, 'Data Matkul Berhasil Dihapus', res);
    } else {
      response(404, null, 'Data Matkul Tidak Ditemukan', res);
    }
  } catch (error) {
    handleErrors(error, res);
  }
};
module.exports = { getAllMatkul, createMatkul, updateMatkul, deleteMatkul }
