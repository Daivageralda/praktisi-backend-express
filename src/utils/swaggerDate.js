const fs = require('fs');
const openapiDoc = require('../../swagger-output.json'); // Gantilah dengan path ke dokumen OpenAPI Anda

// Tambahkan atau perbarui informasi tanggal terakhir di deskripsi
openapiDoc.info.description += `\n\nLast Updated: ${new Date().toISOString()}`;

// Simpan kembali file JSON
fs.writeFileSync('../../swagger-output.json', JSON.stringify(openapiDoc, null, 2));
