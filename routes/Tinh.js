var express = require('express');
var router = express.Router();
const Tinh = require('../middleware/Tinh');
//http://localhost:3000/Tinh/GetAllTinh
router.get('/GetAllTinh',Tinh.GetAllTinh);
//http://localhost:3000/Tinh/GetAllHuyenByIDTinh
router.get('/GetAllHuyenByIDTinh',Tinh.GetAllHuyenByIDTinh);
//http://localhost:3000/Tinh/GetAllHuyenByIDTinh
router.get('/GetAllXaByIDHuyen',Tinh.GetAllXaByIDHuyen);
module.exports = router;