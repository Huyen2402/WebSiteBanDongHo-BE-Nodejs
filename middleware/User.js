const { ObjectId } = require('mongodb/lib/bson');
const db = require('../db');
var jwt = require('jsonwebtoken');
const secret_key = '12345aA!';
var _ = require('lodash');
const {Vonage} = require('@vonage/server-sdk');
const utils = require('../common/utils');
const { assign } = require('lodash');
const vonage = new Vonage({
    apiKey: utils.Vonage.apiKey,
    apiSecret: utils.Vonage.apiSecret
  });
exports.DangNhap = async (req, res, next) => {
    console.log('DangNhap', req.body);
    try {
        const Email = req.body.Email;
        const MatKhau = req.body.MatKhau;
        const dataUser = await db.connect();
      
        const check = await dataUser.db().collection('User').findOne({ Email: Email, MatKhau: MatKhau, DaXacNhan: true });
        if(check === null){
            res.json({result: 'success', errorCode: 1001, message: 'Không tìm thấy tài khoản'});
        }
        else{
            console.log("checkUser",check);
            const token = jwt.sign({ Email: Email }, secret_key, { expiresIn: '1d' });
            console.log("token",token);
            res.json({
                result: 'success', 
                errorCode: 0,
                token: token,
                data: check
            });
        }
    } catch (error) {
        console.log('catch err', error);
        res.status(500).send(error);
    }
   

}


exports.verifyToken = async(req,res,next)=>{
    console.log("verifyToken " , req.header('auth-token'));
    const token = req.header('auth-token');
     
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, secret_key);
        console.log("verified",verified);
        next();
    } catch (err) {
        return res.status(400).send('Invalid Token');
    }
  }

exports.ChinhSuaThongTin = async (req, res, next) => {
    console.log('ChinhSuaThongTin', req.body);
    const id = req.body._id;
    console.log('id', id);
    try {
        const dataUser = await db.connect();
      
        const check = await dataUser.db().collection('User').findOne({ _id: new ObjectId(id) });
        const HoTen = _.isNil(req.body.HoTen) === true ? check.HoTen : req.body.HoTen;
       
        const MatKhau = _.isNil(req.body.MatKhau) === true ? check.MatKhau : req.body.MatKhau;
        
        if(check === null){
            res.json({result: 'success', errorCode: 1001, message: 'Không tìm thấy tài khoản'});
        }
        else{
            console.log("checkUser",check);
            const updateUser = await dataUser.db().collection('User').findOneAndUpdate(
                {_id : new ObjectId(id)},
                {$set : { HoTen: HoTen,
                    MatKhau: MatKhau,
                    }},
                { returnDocument: "after" }
            );
            res.json({result: 'success', errorCode: 0});
        }
    } catch (error) {
        console.log('catch err', error);
        res.status(500).send(error);
    }
   

}

exports.DangKy  = async (req, res, next) => {
    console.log('DangKy', req.body);
   
    try {
        const HoTen = req.body.HoTen;
        const Email = req.body.Email;
        const MatKhau = req.body.MatKhau;
        const SDT = req.body.SDT;
        if(_.isNil(HoTen) === true || _.isNil(Email) === true || _.isNil(MatKhau) === true || _.isNil(SDT) === true){
            res.json({result: 'success', errorCode: 1001, message: 'Thông tin tài khoản không được để trống'});
        }
        else{
            const dataUser = await db.connect();
      
            const check = await dataUser.db().collection('User').findOne({ Email: Email });
            if(check === null){
                const all = await dataUser.db().collection('User').insertOne({HoTen: HoTen, Email: Email,MatKhau:MatKhau, SDT:SDT, MaLoaiTV: new ObjectId("640a9545a188deb19b8f8740"), DaXacNhan: false });
                console.log('DangKy', all);
                req.SDT = SDT;
                req.id =all.insertedId;
                next();
            }
            else{
                res.json({result: 'success', errorCode: 1001, message: 'Thông tin tài khoản đã tồn tại'});
            }
        }
        
    } catch (error) {
        console.log('catch err', error);
        res.status(500).send(error);
    }
}

exports.Call = async (req, res, next) => {
    console.log('call req.SDT', req.SDT);
    let SDT = req.SDT;
    const id = req.id;
    console.log('Call id', id);
    SDT = '84' + SDT.slice(1, 10);
    
      vonage.verify.start({
        number: SDT,
        brand: "Vonage"
      })
        .then(async(resp)  =>  {
            console.log(resp);
            console.log('token',);
         if(_.isNil(resp.request_id) === false){
           
            //   req.token = resp.request_id;
            res.json({result: 'success', errorCode: 0, token : resp.request_id});
            //   next();
         }
         else{
            const dataUser = await db.connect();
            const deleteUser = await dataUser.db().collection('User').findOneAndDelete(
                {_id : id}
                
            );
            console.log('deleteUser',deleteUser );
            res.json({result: 'success', errorCode: 1001, message: 'SDT không hợp lệ'});
         }
        
        })
        .catch(err => console.error(err));

}

exports.VerifyOTP = async (req, res, next)=>{
    const MaXacNhan = req.body.MaXacNhan;
    const Token = req.body.Token;
    const id = req.body._id;
    const check = await _checkOTP(Token, MaXacNhan);
    console.log(check);
    if(check.result.status === '0'){
        const dataUser = await db.connect();
        const updateUser = await dataUser.db().collection('User').findOneAndUpdate(
            {_id : new ObjectId(id)},
            {$set : { DaXacNhan: true }},
            { returnDocument: "after" }
        );
       
        res.json({result: 'success', errorCode: 0});
     
    }
    else{
        res.json({result: 'success', errorCode: 1001, message: 'Mã xác nhận không trùng khớp'});
      
    }

    async function _checkOTP  (REQUEST_ID, CODE) {
        try {
          const result = await  vonage.verify.check(REQUEST_ID, CODE);
          console.log(result);
          return {
              result: result
          }
        } catch (error) {
          console.log('error',error);
        }
          
    }
  }

