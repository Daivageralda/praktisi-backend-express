const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const handleErrors = require('../utils/handlingError');
const response = require('../utils/payload')
const checkRole = require('../utils/roleCheck');

require('dotenv').config();

const auth_server = 'http://localhost:3001';

const login_user = async (req, res) => {
    try {
        const { userid, password } = req.body;
        const isPraktikan = userid.length === 10;
        const isDosen = userid.length > 10;
        const status = checkRole(userid)

        const existingUser = await User.findOne({ where: { userid } });

        if (!existingUser) {
            const responses = await axios.post(`${auth_server}/api/login`,{ userid, password },{ headers: { 'api-key': process.env.API_KEY }})
            console.log('Respons from auth server:', responses.data);
            if (responses.status === 200) {
                const token = jwt.sign({ userid, status:status.status }, process.env.SECRET_KEY, { expiresIn: '1h' });

                await User.create({
                    userid: userid,
                    password: responses.data.userdata.password,
                    nama: responses.data.userdata.nama,
                    email: responses.data.userdata.email,
                    semester: responses.data.userdata.email,
                    praktikan: isPraktikan,
                    asisten_laboratorium: false,
                    dosen: isDosen,
                });
                response(200,token,'Berhasil Login',res)
            } else {
                response(401,responses.data,'Username atau password salah',res)
            }
        } else {
            const responses = await axios.post(`${auth_server}/api/login`,{ userid, password },{ headers: { 'api-key': process.env.API_KEY }})
              
            if (responses.status === 200) {
                const token = jwt.sign({ userid, status:status.status }, process.env.SECRET_KEY, { expiresIn: '1h' });
                response(200,token,'Berhasil Login',res)
            } else {
                response(401,responses.data,'Username atau password salah',res)
            }
        }
    } catch (error) {
        handleErrors(error, res);
    }
}

module.exports = {login_user};