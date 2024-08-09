const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models');
const validateEmail = require('../middleware/validation');
const generateToken = require('../middleware/tokens');
const sendVertificationEmail = require('../middleware/mails')
require('dotenv').config();


let handleRegister = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                err: 1,
                message: 'Missing input parameter'
            });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Email không hợp lệ" });
        }

        const existUser = await User.findOne({ where: { email } });
        if (existUser) {
            return res.status(400).json({ message: "Email đã tồn tại" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashPassword,
        });

        const token = generateToken({ id: user.id, email: user.email }, "7d");
        const url = `${process.env.BASE_URL}/activate/${token}`;
        await sendVertificationEmail(user.email, url);

        res.status(200).json({ message: "Đăng ký thành công", token });
    } catch (e) {
        console.error('Lỗi máy chủ:', e);
        res.status(500).json({ message: "Lỗi máy chủ", error: e.message || e });
    }
};

let activateAccount = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ message: 'Token không tồn tại' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        } catch (err) {
            return res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
        }

        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(400).json({ message: 'Người dùng không tồn tại' });
        }

        if (user.verified) {
            return res.status(200).json({ message: 'Email đã được kích hoạt.' });
        } else {
            user.verified = true;
            await user.save();
            return res.status(200).json({ message: 'Email kích hoạt thành công.' });
        }
    } catch (e) {
        console.error('Lỗi máy chủ:', e);
        return res.status(500).json({ message: 'Lỗi máy chủ', error: e.message || e });
    }
}

let handleLogin = async (req, res)=>{
    try {
        let {email, password} = req.body;
        const user = await User.findOne({where: {email}})
        if(!user){
            return res.status(500).json({message: "Email không tồn tại"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(500).json({message: "Mật khẩu không đúng"})
        }

        res.json({message: "Đăng nhập thành công"})
    } catch (error) {
        console.error('Lỗi máy chủ:', error);
        res.status(500).json({ message: 'Lỗi máy chủ', error });
    }

}

module.exports = {
    handleRegister,
    handleLogin,
    activateAccount
}