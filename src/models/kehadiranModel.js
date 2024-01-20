const { DataTypes } = require('sequelize')
const sequelize = require('../config/connect')
const User = require('./userModel')
const Jadwal = require('./jadwalModel')

const Kehadiran = sequelize.define('Kehadiran', {
  usersid: {
    type: DataTypes.CHAR(20),
    allowNull: false,
    references: {
      model: User,
      key: 'userid',
    },
  },
  kd_jadwal: {
    type: DataTypes.CHAR(10),
    allowNull: false,
    references: {
      model: Jadwal,
      key: 'kd_jadwal',
    },
  },
  pertemuan: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
  materi: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  tanggal: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Hadir', 'Tidak Hadir'),
    allowNull: false,
  },
  keterangan: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
}, {
  tableName: 'kehadiran',
  timestamps: false,
})

module.exports = Kehadiran
