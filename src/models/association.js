const User = require('./userModel')
const Matkul = require('./matkulModel')
const Jadwal = require('./jadwalModel')
const Tugas = require('./tugasModel')
const Informasi = require('./informasiModel')
const NilaiAkhir = require('./nilai_akhirModel')
const Kehadiran = require('./kehadiranModel')
const DetailPengumpulan = require('./detail_pengumpulanModel')

// Establishing a Relationship Between User And Matkul
User.belongsTo(Matkul, { foreignKey: 'kd_matkul', as :'pengajar'})
Matkul.hasMany(User, {foreignKey: 'kd_matkul', as: 'pengajar'})

// Establishing a Relationship Between Jadwal and Matkul
Jadwal.belongsTo(Matkul, { foreignKey: 'kd_matkul' })
Matkul.hasMany(Jadwal, { foreignKey: 'kd_matkul' })

// Establishing a Relationship Between Tugas and Matkul
Tugas.belongsTo(Matkul, { foreignKey: 'kd_matkul' })
Matkul.hasMany(Tugas, { foreignKey: 'kd_matkul' })

// Establishing a Relationship Between Informasi and User
Informasi.belongsTo(User, { foreignKey: 'usersid' })
User.hasMany(Informasi, { foreignKey: 'usersid' })

// Establishing a Relationship Between Nilai_Akhir, Matkul, and User
NilaiAkhir.belongsTo(User, { foreignKey: 'usersid' })
User.hasMany(NilaiAkhir, { foreignKey: 'usersid' })
NilaiAkhir.belongsTo(Matkul, { foreignKey: 'kd_matkul' })
Matkul.hasMany(NilaiAkhir, { foreignKey: 'kd_matkul' })

// Establishing a Relationship Between Kehadiran, Jadwal, and User
Kehadiran.belongsTo(User, { foreignKey: 'usersid' })
User.hasMany(Kehadiran, { foreignKey: 'usersid' })
Kehadiran.belongsTo(Jadwal, { foreignKey: 'kd_jadwal' })
Jadwal.hasMany(Kehadiran, { foreignKey: 'kd_jadwal' })

// Establishing a Relationship Between DetailPengumpulan, User, and Tugas
DetailPengumpulan.belongsTo(User, { foreignKey: 'usersid' });
DetailPengumpulan.belongsTo(Tugas, { foreignKey: 'kd_tugas' });