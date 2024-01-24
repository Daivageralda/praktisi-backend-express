const { DataTypes } = require('sequelize');
const sequelize = require('../config/connect');

const Matkul = sequelize.define('Matkul', {
  kd_matkul: {
    type: DataTypes.CHAR(10),
    primaryKey: true,
    allowNull: false,
  },
  nama_matkul: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: 'matkul_prak',
  timestamps: false,
});


module.exports = Matkul;
