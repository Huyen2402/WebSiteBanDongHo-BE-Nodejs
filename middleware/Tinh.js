const { ObjectId } = require('mongodb/lib/bson');
const db = require('../db');
var _ = require('lodash');

exports.GetAllTinh = async (req, res, next) => {
   try {
     console.log('GetAllTinh');
    const dataTinh = await db.connect();
      
    const all = await dataTinh.db().collection('Tinh').find().toArray();
    res.json({result: 'success', errorCode: 0, data: all});
   } catch (error) {
    console.log('catch err', error);
        res.status(500).send(error);
   }
}

exports.GetAllHuyenByIDTinh = async (req, res, next) => {
    try {
        const parent_code = req.query.parent_code;
    console.log('GetAllHuyenByIDTinh parent_code',parent_code);
    const dataHuyen = await db.connect();
      
    const all = await dataHuyen.db().collection('Huyen').find({parent_code : parent_code}).toArray();
    res.json({result: 'success', errorCode: 0, data: all});
    } catch (error) {
        console.log('catch err', error);
        res.status(500).send(error);
    }
}

exports.GetAllXaByIDHuyen = async (req, res, next) => {
    try {
        const parent_code = req.query.parent_code;
    console.log('GetAllXaByIDHuyen parent_code',parent_code);
    const dataXa = await db.connect();
      
    const all = await dataXa.db().collection('Xa').find({parent_code : parent_code}).toArray();
    res.json({result: 'success', errorCode: 0, data: all});
    } catch (error) {
        console.log('catch err', error);
        res.status(500).send(error);
    }
}
