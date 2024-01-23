const handleErrors = (error, res) => {
  console.error('Terjadi Kesalahan:', error);
  response(500, null, 'Kesalahan Pada Server Internal', res);
};