const cloudinary = require('cloudinary').v2;

const fs = require('fs');


// Return "https" URLs by setting secure: true
cloudinary.config({
    cloud_name: "dkxgovttj",
    api_key: "482755262992517",
    api_secret: "90-WOhN9-RxiwUpG4NAMkEE32Ds",
    secure: true
});

// // Log the configuration
console.log(cloudinary.config());


// /////////////////////////
// // Uploads an image file
// /////////////////////////
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
    if(!req.files) {
        res.send({
            status: false,
            message: 'No file uploaded'
        });
    } else {
      if(req.files.HinhAnh.length > 0){
        for (let index = 0; index < req.files.HinhAnh.length; index++) {
          let avatar = req.files.HinhAnh[index];
          const imagePath = avatar.name;
          avatar.mv('./uploads/' + avatar.name);
          const publicId = await uploadImage('./uploads/'+imagePath);
          fs.unlinkSync('./uploads/'+imagePath);
          const url = await getAssetInfo(publicId);
          console.log("url",url);

          urlRes.push(url)

        }
        res.send({
          status: true,
          message: 'File is uploaded',
          data: {
              url: urlRes
          }
      });
      }
        //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
       else{
        let avatar = req.files.HinhAnh;

        const imagePath = avatar.name;
        avatar.mv('./uploads/' + avatar.name);
       
    // Upload the image
    const publicId = await uploadImage('./uploads/'+imagePath);
    fs.unlinkSync('./uploads/'+imagePath);
    // Get the colors in the image
    const url = await getAssetInfo(publicId);
    console.log("url",url);
    // Create an image tag, using two of the colors in a transformation
    const imageTag = await createImageTag(publicId);
        res.send({
            status: true,
            message: 'File is uploaded',
            data: {
                name: avatar.name,
                imageTag: imageTag,
                size: avatar.size, 
                url: url
            }
        });
       }
    }
} catch (err) {
    res.status(500).send(err);
}
    
  };