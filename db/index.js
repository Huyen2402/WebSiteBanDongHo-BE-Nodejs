const mongodb = require('mongodb');
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient
exports.connect = async function connect(){
    console.log("connect db");
    try {
    //   const test = await mongoose.connect('mongodb://localhost:27017/QuanLyBanDongHo',
    //         {
    //             useNewUrlParser: true,
               
    //             useUnifiedTopology: true
    //         }
    //     );
    // //     const connectDB = await test.connection;
    // //    console.log(connectDB);
    //     const db =  test.connection;
      
    //     console.log(await db.collection('DanhMuc').find().toArray());
    //     db.on("error", console.error.bind(console, "connection error: "));
    //     db.once("open", function () {
    //         console.log("Connected successfully");
    //     });
    //     return test;
       const test = await MongoClient.connect('mongodb://localhost:27017/QuanLyBanDongHo',{
        useNewUrlParser: true,
       
        useUnifiedTopology: true
       });
    //    console.log(await test.db().collection('DanhMuc').find().toArray());
       return test;
        // await MongoClient.connect('mongodb://localhost:27017/QuanLyBanDongHo', (err, db) => {
        //     console.log(err);
        //     if (err) throw err
        //     console.log(db);
        //     console.log(db.db())

        //     db.db().collection('DanhMuc').find().toArray((err, result) => {
        //         if (err) throw err

        //         console.log(result)
        //     })
        // })
    }
    catch (err) {
        console.log(err)
    }
}

