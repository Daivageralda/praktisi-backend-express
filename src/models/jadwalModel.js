const { DataTypes } = require('sequelize')
const sequelize = require('../config/connect')
const Matkul = require('./matkulModel')

const Jadwal = sequelize.define('Jadwal', {
  kd_jadwal: {
    type: DataTypes.CHAR(10),
    primaryKey: true,
    allowNull: false,
  },
  tanggal: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  waktu_mulai: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  waktu_selesai: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  kelas: {
    type: DataTypes.STRING(8),
    allowNull: false,
  },
  ruangan: {
    type: DataTypes.STRING(30),
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
  tableName: 'jadwal',
  timestamps: false,
});

module.exports = Jadwal;
