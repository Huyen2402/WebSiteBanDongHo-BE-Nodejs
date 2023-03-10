var express = require('express');
var router = express.Router();
const User = require('../middleware/User');
/* GET users listing. */
router.post('/', User.DangNhap);
router.post('/ChinhSuaThongTin', User.verifyToken, User.ChinhSuaThongTin);
router.post('/DangKy', User.DangKy, User.Call);
router.post('/VerifyOTP',User.VerifyOTP);
module.exports = router;
