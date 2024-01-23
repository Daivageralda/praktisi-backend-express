const Jadwal = require('../models/jadwalModel');
const Matkul = require('../models/matkulModel');
const response = require('../utils/payload');

// Define Relationship
require('../models/association');

// Helper Function to Handle Errors
const handleErrors = (error, res) => {
  console.error('Terjadi Kesalahan:', error);
  response(500, null, 'Kesalahan Pada Server Internal', res);
};

// Get Method
const getAllJadwal = async (req, res) => {
  try {
    let jadwals = await Jadwal.findAll({
      include: [
        {
          model: Matkul,
          attributes: ['nama_matkul'],
        },
      ],
    });

    const transformedData = jadwals.map((jadwal) => ({
      kd_jadwal: jadwal.kd_jadwal,
      tanggal: jadwal.tanggal,
      waktu_mulai: jadwal.waktu_mulai,
      waktu_selesai: jadwal.waktu_selesai,
      kelas: jadwal.kelas,
      ruangan: jadwal.ruangan,
      kd_matkul: jadwal.kd_matkul,
      nama_matkul: jadwal.Matkul?.nama_matkul || null,
    }));

    response(200, transformedData, 'Data Jadwal Berhasil Diambil', res);
  } catch (error) {
    handleErrors(error, res);
  }
};

// Method POST
const createJadwal = async (req, res) => {
  try {
    const { kd_jadwal, tanggal, waktu_mulai, waktu_selesai, kelas, ruangan, kd_matkul } = req.body;

    const newJadwal = await Jadwal.create({
      kd_jadwal,
      tanggal,
      waktu_mulai,
      waktu_selesai,
      kelas,
      ruangan,
      kd_matkul,
    });

    await newJadwal.reload({ include: [{ model: Matkul, attributes: ['nama_matkul'] }] });

    const transformedData = {
      kd_jadwal: newJadwal.kd_jadwal,
      tanggal: newJadwal.tanggal,
      waktu_mulai: newJadwal.waktu_mulai,
      waktu_selesai: newJadwal.waktu_selesai,
      kelas: newJadwal.kelas,
      ruangan: newJadwal.ruangan,
      kd_matkul: newJadwal.kd_matkul,
      nama_matkul: newJadwal.Matkul?.nama_matkul || null,
    };

    response(201, transformedData, 'Jadwal Berhasil Dibuat', res);
  } catch (error) {
    handleErrors(error, res);
  }
};

// Method PUT
const updateJadwal = async (req, res) => {
  try {
    const { kd_jadwal, tanggal, waktu_mulai, waktu_selesai, kelas, ruangan, kd_matkul } = req.body;

    const jadwalToUpdate = await Jadwal.findOne({ where: { kd_jadwal } });

    if (!jadwalToUpdate) {
      return response(404, null, 'Jadwal Tidak Ditemukan', res);
    }

    await jadwalToUpdate.update({
      tanggal,
      waktu_mulai,
      waktu_selesai,
      kelas,
      ruangan,
      kd_matkul,
    });

    await jadwalToUpdate.reload({ include: [{ model: Matkul, attributes: ['nama_matkul'] }] });

    const transformedData = {
      kd_jadwal: jadwalToUpdate.kd_jadwal,
      tanggal: jadwalToUpdate.tanggal,
      waktu_mulai: jadwalToUpdate.waktu_mulai,
      waktu_selesai: jadwalToUpdate.waktu_selesai,
      kelas: jadwalToUpdate.kelas,
      ruangan: jadwalToUpdate.ruangan,
      kd_matkul: jadwalToUpdate.kd_matkul,
      nama_matkul: jadwalToUpdate.Matkul?.nama_matkul || null,
    };

    response(200, transformedData, 'Jadwal Berhasil Diperbarui', res);
  } catch (error) {
    handleErrors(error, res);
  }
};

// Method DELETE
const deleteJadwal = async (req, res) => {
  try {
    const { kd_jadwal } = req.params;

    const deletedJadwal = await Jadwal.destroy({
      where: { kd_jadwal },
    });

    if (deletedJadwal) {
      response(200, null, 'Data Jadwal Berhasil Dihapus', res);
    } else {
      response(404, null, 'Data Jadwal Tidak Ditemukan', res);
    }
  } catch (error) {
    handleErrors(error, res);
  }
};

module.exports = { getAllJadwal, createJadwal, updateJadwal, deleteJadwal };