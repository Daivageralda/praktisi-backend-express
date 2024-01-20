const sequelize = require('../config/connect'); 
async function syncDatabase() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Sinkronsasi Database Sukses');
  } catch (error) {
    console.error('Sinkronsasi Database Gagal:', error);
  }
}

module.exports = syncDatabase;
