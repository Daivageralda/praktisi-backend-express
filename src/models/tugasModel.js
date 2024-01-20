const { DataTypes } = require('sequelize')
const sequelize = require('../config/connect')
const Matkul = require('./matkulModel')

const Tugas = sequelize.define('Tugas', {
  kd_tugas: {
    type: DataTypes.CHAR(10),
    primaryKey: true,
    allowNull: false,
  },
  jenis_tugas: {
    type: DataTypes.ENUM('Post Test', 'Proyek Akhir'),
    allowNull: false,
  },
  nama_tugas: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  deskripsi_tugas: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tanggal_dibuat: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  tanggal_pengumpulan: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  kd_matkul: {
    type: DataTypes.CHAR(10),
    allowNull: false,
    references: {
      model: Matkul,
      key: 'kd_matkul',
    },
  },
}, {
  tableName: 'tugas',
  timestamps: false,
});

module.exports = Tugas;
