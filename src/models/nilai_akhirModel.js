const { DataTypes } = require('sequelize')
const sequelize = require('../config/connect')
const User = require('./userModel')
const Matkul = require('./matkulModel')

const NilaiAkhir = sequelize.define('NilaiAkhir', {
  usersid: {
    type: DataTypes.CHAR(20),
    allowNull: false,
    references: {
      model: User,
      key: 'userid',
    },
  },
  kd_matkul: {
    type: DataTypes.CHAR(10),
    allowNull: false,
    references: {
      model: Matkul,
      key: 'kd_matkul',
    },
  },
  nilai_akhir: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: true,
    defaultValue: 0.00,
  },
}, {
  tableName: 'nilai_akhir',
  timestamps: false,
})

module.exports = NilaiAkhir
