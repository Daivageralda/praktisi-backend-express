const checkUserRole = (user) => {
    if (user.dosen) {
      return 'dosen';
    } else if (user.praktikan) {
      return 'praktikan';
    } else {
      return 'unknown';
    }
  };
  
module.exports = {checkUserRole}
  