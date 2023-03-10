const { ObjectId } = require('mongodb/lib/bson');
const db = require('../db');
var _ = require('lodash');

exports.GetAllDiaChi = async (req, res, next) => {
    console.log('GetAllDiaChi');
    try {
        const datDC = await db.connect();
      
    const all = await datDC.db().collection('DiaChi').find().toArray();
    res.json({result: 'success', errorCode: 0, data: all});
    } catch (error) {
        console.log('catch err', error);
        res.status(500).send(error);
    }
}

exports.AddDiaChi = async (req, res, next) => {
    console.log('AddDiaChi', req.body);
    try {
        const CodeTinh = req.body.CodeTinh;
        const CodeHuyen =  req.body.CodeHuyen;
        const CodeXa = req.body.CodeXa;
        const DiaChi = req.body.DiaChi;
        const TenNguoiMua = req.body.TenNguoiMua;
        const SDT =  req.body.SDT;
        if(_.isNil(CodeTinh) === true || _.isNil(CodeHuyen) === true || _.isNil(CodeXa) === true || _.isNil(DiaChi) === true || _.isNil(TenNguoiMua) || _.isNil(SDT)){
            res.json({result: 'success', errorCode: 1001, message: 'Có lỗi'});
        }else{
            const datDC = await db.connect();
      
            const all = await datDC.db().collection('DiaChi').insertOne({
                CodeTinh:CodeTinh,
                CodeHuyen: CodeHuyen,
                CodeXa: CodeXa,
                DiaChi: DiaChi,
                TenNguoiMua: TenNguoiMua,
                SDT: SDT
            });
            res.json({result: 'success', errorCode: 0, data: all});
        }
       
    } catch (error) {
        console.log('catch err', error);
        res.status(500).send(error);
    }
}

exports.UpdateDiaChi = async (req, res, next) => {
    console.log('UpdateDiaChi', req.body);
    const id = req.body._id;
    try {
        const datDC = await db.connect();
      
            const check = await datDC.db().collection('DiaChi').findOne({
               _id: new ObjectId(id)
            });
            console.log('UpdateDiaChi check', check);
            if(check !== null){
                const CodeTinh = _.isNil(req.body.CodeTinh) === true ? check.CodeTinh :  req.body.CodeTinh;
                const CodeHuyen =  _.isNil(req.body.CodeHuyen) === true ? check.CodeHuyen :  req.body.CodeHuyen;
                const CodeXa = _.isNil(req.body.CodeXa) === true ? check.CodeXa :  req.body.CodeXa;
                const DiaChi = _.isNil(req.body.DiaChi) === true ? check.DiaChi :  req.body.DiaChi;
                const TenNguoiMua = _.isNil(req.body.TenNguoiMua) === true ? check.TenNguoiMua :  req.body.TenNguoiMua;
                const SDT =  _.isNil(req.body.SDT) === true ? check.SDT :  req.body.SDT;
                const updateDC = await datDC.db().collection('DiaChi').findOneAndUpdate(
                    {_id : new ObjectId(id)},
                    {$set : {  CodeTinh:CodeTinh,
                        CodeHuyen: CodeHuyen,
                        CodeXa: CodeXa,
                        DiaChi: DiaChi,
                        TenNguoiMua: TenNguoiMua,
                        SDT: SDT
                        
                        }},
                    { returnDocument: "after" }
                );
                res.json({result: 'success', errorCode: 0, data: updateDC});
            }
        
       
       
    } catch (error) {
        console.log('catch err', error);
        res.status(500).send(error);
    }
}
exports.deleteDiaChi = async (req, res, next) => {
    console.log('deleteDiaChi', req.query.id);
    const id = req.query.id;
    try {
        const datDC = await db.connect();
      
    const all = await datDC.db().collection('DiaChi').findOneAndDelete({_id: new ObjectId(id)});
    res.json({result: 'success', errorCode: 0, data: all});
    } catch (error) {
        console.log('catch err', error);
        res.status(500).send(error);
    }
}