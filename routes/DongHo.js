var express = require('express');
var router = express.Router();
const DongHo = require('../middleware/DongHo');

//http://localhost:3000/DongHo/GetAllDongHo 
router.get("/GetAllDongHo", DongHo.GetAllDongHo);
//http://localhost:3000/DongHo/GetDongHoByIDDanhMuc 
router.get("/GetDongHoByIDDanhMuc", DongHo.GetDongHoByIDDanhMuc);
//http://localhost:3000/DongHo/UpdateDanhMuc 
router.post("/AddDongHoByIDDanhMuc", DongHo.AddDongHoByIDDanhMuc);
//http://localhost:3000/DongHo/uploadImage 
router.post("/uploadImage", DongHo.uploadImage);
//http://localhost:3000/DongHo/UpdateDongHoByIDDanhMuc 
router.post("/UpdateDongHoByIDDanhMuc", DongHo.UpdateDongHoByIDDanhMuc);
module.exports = router;