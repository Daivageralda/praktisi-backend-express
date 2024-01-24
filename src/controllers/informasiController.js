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
}

// POST Method
const createInformasi = async (req, res) => {
  try {
    const { kd_informasi, tanggal, judul_informasi, deskripsi_informasi, tautan, usersid} = req.body

    const newInformasi = await Informasi.create({
      kd_informasi,
      tanggal,
      judul_informasi,
      deskripsi_informasi,
      tautan,
      usersid
    })

    await newInformasi.reload({
      include: [
        { model: User,
          attributes: ['nama']}
        ]
  })

    const transformedData = {
      kd_informasi: newInformasi.kd_informasi,
        tanggal: newInformasi.tanggal.toLocaleString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        judul_informasi: newInformasi.judul_informasi,
        deskripsi_informasi: newInformasi.deskripsi_informasi,
        tautan: newInformasi.tautan,
        userid: newInformasi.usersid,
        nama_pembuat: newInformasi.User ? newInformasi.User.nama : null,
    }

    response(201, transformedData, 'Informasi Berhasil Dibuat', res)
  } catch (error) {
    handleErrors(error, res)
  }
}

// Method PUT
const updateInformasi = async (req, res) => {
  try {
    const { kd_informasi, tanggal, judul_informasi, deskripsi_informasi, tautan, usersid} = req.body

    const informasiToUpdate = await Informasi.findOne({ where: { kd_informasi } })

    if (!informasiToUpdate) {
      return response(404, null, 'Informasi Tidak Ditemukan', res)
    }

    await informasiToUpdate.update({
      tanggal,
      judul_informasi,
      deskripsi_informasi,
      tautan,
      usersid
    })

    await informasiToUpdate.reload({
      include: [
        { model: User,
          attributes: ['nama']}
        ]
  })

    const transformedData = {
      kd_informasi: informasiToUpdate.kd_informasi,
        tanggal: informasiToUpdate.tanggal.toLocaleString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        judul_informasi: informasiToUpdate.judul_informasi,
        deskripsi_informasi: informasiToUpdate.deskripsi_informasi,
        tautan: informasiToUpdate.tautan,
        userid: informasiToUpdate.usersid,
        nama_pembuat: informasiToUpdate.User ? informasiToUpdate.User.nama : null,
    }

    response(200, transformedData, 'Informasi Berhasil Diperbarui', res)
  } catch (error) {
    handleErrors(error, res)
  }
}

// Method DELETE
const deleteInformasi = async (req, res) => {
  try {
    const { kd_informasi } = req.params;

    const deletedInformasi = await Informasi.destroy({
      where: { kd_informasi },
    });

    if (deletedInformasi) {
      response(200, null, 'Data Informasi Berhasil Dihapus', res);
    } else {
      response(404, null, 'Data Informasi Tidak Ditemukan', res);
    }
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = { getAllInformasi, createInformasi, updateInformasi, deleteInformasi };
