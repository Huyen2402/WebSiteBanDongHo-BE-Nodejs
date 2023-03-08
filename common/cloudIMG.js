const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: "dkxgovttj",
  api_key: "482755262992517",
  api_secret: "90-WOhN9-RxiwUpG4NAMkEE32Ds",
  secure: true
});

// // Log the configuration
console.log(cloudinary.config());


const uploadImage = async (imagePath) => {

   
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      console.log("result upload", result);
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
        console.log("result",result);
        return result.colors;
        } catch (error) {
        console.error(error);
    }
};
 
const createImageTag = (publicId) => {
   
    let imageTag = cloudinary.image(publicId
    
    );
    
    return imageTag;
};
  
exports.uploadImage = async (req, res, next) => {
 
  try {
    if(!req.files) {
        res.send({
            status: false,
            message: 'No file uploaded'
        });
    } else {
        //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
        let avatar = req.files.HinhAnh;

        const imagePath = avatar.name;
        avatar.mv('./uploads/' + avatar.name);
       
    // Upload the image
    const publicId = await uploadImage('./uploads/'+imagePath);
    fs.unlinkSync('./uploads/'+imagePath);
    // Get the colors in the image
    const colors = await getAssetInfo(publicId);

    // Create an image tag, using two of the colors in a transformation
    const imageTag = await createImageTag(publicId);
   
        res.send({
            status: true,
            message: 'File is uploaded',
            data: {
                name: avatar.name,
                imageTag: imageTag,
                size: avatar.size
            }
        });
    }
} catch (err) {
    res.status(500).send(err);
}
    
  };