const { ObjectId } = require('mongodb/lib/bson');
const db = require('../db');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: "dkxgovttj",
    api_key: "482755262992517",
    api_secret: "90-WOhN9-RxiwUpG4NAMkEE32Ds",
    secure: true
});

// // Log the configuration
console.log(cloudinary.config());

const uploadImage = async (imagePath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
     
      return result.public_id;
    } catch (error) {
      console.error(error);
    }
};
    

const getAssetInfo = async (publicId) => {

    // Return colors in the response
    const options = {
      colors: true,
    };

    try {
        // Get details about the asset
        const result = await cloudinary.api.resource(publicId, options);
        console.log("getAssetInfo result URL",result.url);
        return result.url;
        } catch (error) {
        console.error(error);
    }
};

const createImageTag = (publicId) => {
    let imageTag = cloudinary.image(publicId);
    
    return imageTag;
};

exports.uploadImage = async (req, res, next) => {
    const urlRes = []
    try {
        console.log(req.files);
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
             //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
             let HinhAnh = req.files.HinhAnh;
             let HinhAnh1 = req.files.HinhAnh1;
             const imagePath = HinhAnh.name;
             const imagePath1 = HinhAnh1.name;
             avatar.mv('./uploads/' + HinhAnh.name);
             avatar.mv('./uploads/' + HinhAnh1.name);
             // Upload the image
             const publicId = await uploadImage('./uploads/' + imagePath);
             const publicId1 = await uploadImage('./uploads/' + imagePath1);
             fs.unlinkSync('./uploads/' + imagePath);
             fs.unlinkSync('./uploads/' + imagePath1);
             // Get the colors in the image
             const url = await getAssetInfo(publicId);
             const url1 = await getAssetInfo(publicId1);
             // Create an image tag, using two of the colors in a transformation
             const imageTag = await createImageTag(publicId);
             const imageTag1 = await createImageTag(publicId1);
             res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    
                 
                    HinhAnh: url,
                    HinhAnh1: url1,
                }
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }

};

exports.GetAllDongHo = async (req, res, next) => {
    console.log("GetAllDongHo");
    try {
        const dataDanhMuc = await db.connect();

        const all = await dataDanhMuc.db().collection('DongHo').find().toArray()
        console.log("GetAllDongHo all", all);
        res.send(all);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.GetDongHoByIDDanhMuc = async (req, res, next) => {
    console.log("GetAllDongHo", req.query.id);
    const id = req.query.id;
    try {
        const dataDanhMuc = await db.connect();

        const check = await dataDanhMuc.db().collection('DongHo').find({ MaDanhMuc: new ObjectId(id) }).toArray();

        console.log("GetAllDongHo all", check);
        res.send(check);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


exports.AddDongHoByIDDanhMuc = async (req, res, next) => {
    console.log("AddDongHoByIDDanhMuc", req.body);
    const Body = req.body;
    const MaDanhMuc = Body.MaDanhMuc || '';
    const TenDongHo = Body.TenDongHo || '';
    const Mota = Body.Mota || '';
    // const HinhAnh = req.files.HinhAnh || null;
    // const HinhAnh1 = req.files.HinhAnh1 || null;
    const GiaBan = Body.GiaBan || '';
    const KhuyenMai = Body.KhuyenMai || '';

    try {
       
            if (MaDanhMuc === '' || TenDongHo === ''|| Mota === '' || GiaBan === '' || KhuyenMai === '') {
                res.send({
                    status: false,
                    message: 'Có lỗi xảy ra, thiếu thông tin'
                });
            }
            else {
                const dataDanhMuc = await db.connect();

                const check = await dataDanhMuc.db().collection('DongHo').findOne({ TenDongHo: TenDongHo });
                console.log("GetAllDongHo all", check);
                if (check === null) {
                  
                    const newDongHo = await dataDanhMuc.db().collection('DongHo').insertOne({
                        TenDongHo: TenDongHo,
                        MaDanhMuc: MaDanhMuc,
                        Mota: Mota,
                        HinhAnh: url,
                        HinhAnh1: url1,
                        GiaBan: GiaBan,
                        KhuyenMai: KhuyenMai
                    });
                   
                    res.send(newDongHo);
                }
                else {
                    res.json({ mess: "Tên đã tồn tại" })
                }
            
        }




    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
