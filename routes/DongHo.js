var express = require('express');
var router = express.Router();
const DongHo = require('../middleware/DongHo');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
//http://localhost:3000/DongHo/GetAllDongHo 
router.get("/GetAllDongHo", DongHo.GetAllDongHo);
//http://localhost:3000/DongHo/GetDongHoByIDDanhMuc 
router.get("/GetDongHoByIDDanhMuc", DongHo.GetDongHoByIDDanhMuc);
//http://localhost:3000/DongHo/UpdateDanhMuc 
router.post("/AddDongHoByIDDanhMuc", DongHo.AddDongHoByIDDanhMuc);
module.exports = router;