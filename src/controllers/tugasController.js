const Tugas = require('../models/tugasModel')
const Matkul = require('../models/matkulModel')
const response = require('../utils/payload')

// Define Relationship
require('../models/association')

// Function to Handle Errors
const handleErrors = require('../utils/handlingError')

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
        nama_tugas: tugas.nama_tugas,
        deskripsi_tugas: tugas.deskripsi_tugas,
        tanggal_dibuat_dibuat: tugas.tanggal_dibuat.toLocaleString('id-ID', {
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
      handleErrors(error, res);
    }
}

// POST Method
const createTugas = async (req, res) => {
  try {
    const { kd_tugas, jenis_tugas, nama_tugas, deskripsi_tugas, tanggal_dibuat, tanggal_pengumpulan,kd_matkul} = req.body

    const newTugas = await Tugas.create({
      kd_tugas,
      jenis_tugas,
      nama_tugas,
      deskripsi_tugas,
      tanggal_dibuat,
      tanggal_pengumpulan,
      kd_matkul
    })

    await newTugas.reload({
      include: [
        { model: Matkul,
          attributes: ['nama_matkul']}
        ]
  })

    const transformedData = {
        kd_tugas: newTugas.kd_tugas,
        jenis_tugas: newTugas.jenis_tugas,
        nama_tugas: newTugas.nama_tugas,
        deskripsi_tugas: newTugas.deskripsi_tugas,
        tanggal_dibuat: newTugas.tanggal_dibuat.toLocaleString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        tanggal_pengumpulan: newTugas.tanggal_pengumpulan.toLocaleString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        kd_matkul: newTugas.kd_matkul,
        nama_matkul: newTugas.Matkul ? newTugas.Matkul.nama_matkul : null,
    }

    response(201, transformedData, 'Tugas Berhasil Dibuat', res)
  } catch (error) {
    handleErrors(error, res)
  }
}

// Method PUT
const updateTugas = async (req, res) => {
  try {
    const { kd_tugas, jenis_tugas, nama_tugas, deskripsi_tugas, tanggal_dibuat, tanggal_pengumpulan,kd_matkul} = req.body

    const tugasToUpdate = await Tugas.findOne({ where: { kd_tugas } })

    if (!tugasToUpdate) {
      return response(404, null, 'Tugas Tidak Ditemukan', res)
    }

    await tugasToUpdate.update({
      jenis_tugas,
      nama_tugas,
      deskripsi_tugas,
      tanggal_dibuat,
      tanggal_pengumpulan,
      kd_matkul
    })

    await tugasToUpdate.reload({
      include: [
        { model: Matkul,
          attributes: ['nama_matkul']}
        ]
  })

    const transformedData = {
      kd_tugas: tugasToUpdate.kd_tugas,
        jenis_tugas: tugasToUpdate.jenis_tugas,
        nama_tugas: tugasToUpdate.nama_tugas,
        deskripsi_tugas: tugasToUpdate.deskripsi_tugas,
        tanggal_dibuat: tugasToUpdate.tanggal_dibuat.toLocaleString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        tanggal_pengumpulan: tugasToUpdate.tanggal_pengumpulan.toLocaleString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        kd_matkul: tugasToUpdate.kd_matkul,
        nama_matkul: tugasToUpdate.Matkul ? tugasToUpdate.Matkul.nama_matkul : null,
    }

    response(200, transformedData, 'Tugas Berhasil Diperbarui', res)
  } catch (error) {
    handleErrors(error, res)
  }
}

// Method DELETE
const deleteTugas = async (req, res) => {
  try {
    const { kd_tugas } = req.params;

    const deletedTugas = await Tugas.destroy({
      where: { kd_tugas },
    });

    if (deletedTugas) {
      response(200, null, 'Data Tugas Berhasil Dihapus', res);
    } else {
      response(404, null, 'Data Tugas Tidak Ditemukan', res);
    }
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = { getAllTugas, createTugas, updateTugas, deleteTugas };
