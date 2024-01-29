const checkUserRole = (user) => {
  let roleInfo = {};

  if (user.praktikan && user.asisten_laboratorium && user.userid.length === 10) {
    roleInfo = {
      status: "asisten_laboratorium dan praktikan",
      matkul: user.pengajar ? user.pengajar.nama_matkul : null,
    };
  } else if (user.praktikan && user.userid.length === 10) {
    roleInfo = {
      status: "praktikan",
    };
  } else if (user.asisten_laboratorium) {
    roleInfo = {
      status: "asisten_laboratorium",
      matkul: user.pengajar ? user.pengajar.nama_matkul : null,
    };
  } else if (user.dosen && user.userid.length > 10) {
    roleInfo = {
      status: "dosen",
      matkul: user.pengajar ? user.pengajar.nama_matkul : null,
    }
  }else if (user.length ===10){
    roleInfo = {
      status:"praktikan"
  }

  return roleInfo;
}
};

module.exports = checkUserRole;
