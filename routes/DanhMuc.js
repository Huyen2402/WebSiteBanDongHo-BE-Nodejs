var express = require('express');
var router = express.Router();
const DanhMuc = require('../middleware/DanhMuc')

//http://localhost:3000/DanhMuc/UpdateDanhMuc 
router.post("/UpdateDanhMuc", DanhMuc.UpdateDanhMuc);
//http://localhost:3000/DanhMuc/GetDanhMuc
router.get("/GetDanhMuc", DanhMuc.GetDanhMuc);
//http://localhost:3000/DanhMuc/DeleteByIDDanhMuc?id=640811fe6ad255b3b069d779
router.get("/DeleteByIDDanhMuc", DanhMuc.DeleteByIDDanhMuc);
//http://localhost:3000/DanhMuc/FindOneDanhMuc?id=6407e847eab1fe911d81e60e
router.get("/FindOneDanhMuc", DanhMuc.FindByIDDanhMuc);
//http://localhost:3000/DanhMuc/AddDanhMuc
router.post("/AddDanhMuc", DanhMuc.AddDanhMuc);
module.exports = router;