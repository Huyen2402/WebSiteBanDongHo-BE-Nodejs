var express = require('express');
var router = express.Router();
const DongHo = require('../middleware/DongHo');

/* GET home page. */
router.post('/', DongHo.uploadImage);

module.exports = router;
