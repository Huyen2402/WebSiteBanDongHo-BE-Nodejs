var mongoose = require('mongoose');
var DanhMuc = new mongoose.Schema({
    TenDanhMuc: { type: String, required: true },
    DaXoa: { type: Boolean, default: false },
   
})

// Biên dịch mô hình từ schema
module.exports = mongoose.model('DanhMuc', DanhMuc);