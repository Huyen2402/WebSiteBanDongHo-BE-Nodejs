var express = require('express');
var router = express.Router();
const DiaChi = require('../middleware/DiaChi');

//http://localhost:3000/DC/GetAllDiaChi 
router.get("/GetAllDiaChi", DiaChi.GetAllDiaChi);

//http://localhost:3000/DC/addDC 
router.post("/addDC", DiaChi.AddDiaChi);

//http://localhost:3000/DC/updateDC 
router.post("/updateDC", DiaChi.UpdateDiaChi);

//http://localhost:3000/DC/deleteDC 
router.get("/deleteDC", DiaChi.deleteDiaChi);
module.exports = router;