const { ObjectId } = require('mongodb/lib/bson');
const db = require('../db');
const DanhMuc= require('../model/DanhMucModel');
var _ = require('lodash');
exports.GetDanhMuc = async (req, res, next) => {
    console.log("GetDanhMuc");
    try {
        const dataDanhMuc = await db.connect();
      
        const all = await dataDanhMuc.db().collection('DanhMuc').find().toArray()

        console.log("GetDanhMuc all", all);
        res.send(all);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.AddDanhMuc = async (req, res, next) => {
    console.log("AddDanhMuc", req.body);
    const Body = req.body;
    const TenDanhMuc =Body.TenDanhMuc;
    const DaXoa = _.isNil(Body.DaXoa ) === true ? DaXoa = false : Body.DaXoa;
    
    try {
        if(_.isNil(TenDanhMuc) !== true){
            const dataDanhMuc = await db.connect();
      
        const check = await dataDanhMuc.db().collection('DanhMuc').findOne({TenDanhMuc: TenDanhMuc});
        if(check === null){
            const all = await dataDanhMuc.db().collection('DanhMuc').insertOne({TenDanhMuc: TenDanhMuc, DaXoa: DaXoa});
            // let newDanhMuc = new DanhMuc();
            // newDanhMuc.TenDanhMuc = TenDanhMuc;
            // newDanhMuc.DaXoa = DaXoa;
            // console.log(newDanhMuc);
       
            // await  newDanhMuc.save;
            res.json({result: 'success', errorCode: 0});
             
        }
      
       else{
      
        res.json({result: 'success', errorCode: 1001, message: 'Tên đã tồn tại'});
       }
        }
        else{
            res.json({result: 'success', errorCode: 1001, message: 'Tên danh mục không được để trống'});
           
        }
       
       
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
        
    }
}

exports.FindByIDDanhMuc = async (req, res, next) => {
    console.log("FindOneDanhMuc id", req.query.id);
   
    const id =  req.query.id;
  
    try {

        
        const dataDanhMuc = await db.connect();
       
        const all = await dataDanhMuc.db().collection('DanhMuc').findOne({_id: new ObjectId(id)});
        console.log("check",all);
      
        res.send(all);
     
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
        
    }
}

exports.UpdateDanhMuc = async (req, res, next) => {
    console.log("UpdateDanhMuc", req.body);
 
    const id =  req.body._id;
  console.log("id",id);
    const Body = req.body;
   
    
    try {
      
        const dataDanhMuc = await db.connect();
      
        const check = await dataDanhMuc.db().collection('DanhMuc').findOne({_id: new ObjectId(id)});
        console.log("check", check);
        if(check !== null){
            const TenDanhMuc = _.isNil(Body.TenDanhMuc) === true ? check.TenDanhMuc : Body.TenDanhMuc;
            const DaXoa = _.isNil(Body.DaXoa) === true ? check.DaXoa : Body.DaXoa;
         
            const all = await dataDanhMuc.db().collection('DanhMuc').findOneAndUpdate(
                {_id : new ObjectId(id)},
                {$set : {TenDanhMuc: TenDanhMuc, DaXoa: DaXoa}},
                { returnDocument: "after" }
            );
           console.log(all);
           res.json({result: 'success', errorCode: 0});
            
        }
      
       else{
        res.json({result: 'success', errorCode: 1001, message: 'Danh mục không tồn tại'});
       
       }
       
       
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
        
    }
}
exports.DeleteByIDDanhMuc = async (req, res, next) => {
    console.log("DeleteByIDDanhMuc id", req.query.id);
   
    const id =  req.query.id;
  
    try {

        
        const dataDanhMuc = await db.connect();
       
        const check = await dataDanhMuc.db().collection('DanhMuc').findOne({_id: new ObjectId(id)});
        console.log("check",check);
        if(check !== null){
            const deleteDanhMuc = await dataDanhMuc.db().collection('DanhMuc').findOneAndDelete(
                {_id : new ObjectId(id)}
                
            );
            console.log("deleteDanhMuc", deleteDanhMuc);
            if(deleteDanhMuc.ok === 1){
                const deleteDongHo = await dataDanhMuc.db().collection('DongHo').deleteMany(
                    {MaDanhMuc : new ObjectId(id)}
                    
                );
                res.json({result: 'success', errorCode: 0});
                
            }
            else{
                res.json({result: 'success', errorCode: 1001, message: 'Có lỗi'});
              
            }
            
        }
        else{
            res.json({result: 'success', errorCode: 1001, message: 'Danh mục không tồn tại'});
           
        }
      
       
     
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
        
    }
}
