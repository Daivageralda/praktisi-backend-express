const { DataTypes } = require('sequelize')
const sequelize = require('../config/connect')
const User = require('./userModel')
const Tugas = require('./tugasModel')

const DetailPengumpulan = sequelize.define('DetailPengumpulan', {
        usersid: {
            type: DataTypes.CHAR(20),
            allowNull: false,
            references: {
                model: User,
                key: 'userid',
            },
        },
        kd_tugas: {
            type: DataTypes.CHAR(10),
            allowNull: false,
            references: {
                model: Tugas,
                key: 'kd_tugas',
        }},
        tanggal_dikumpul: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        file_tugas: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        nilai_tugas: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
    tableName: 'detail_pengumpulan',
    timestamps: false,
    })

module.exports = DetailPengumpulan
