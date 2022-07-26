const dotenv = require("dotenv");
const multer = require('multer')
const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary')

dotenv.config();

const {
    CLOUDINARY_HOST,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
} = process.env

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// exports.uploads = (file, folder) => {
//   console.log(process.env);
//   return new Promise((resolve) => {
//     cloudinary.uploader.upload(
//       file,
//       (result) => {
//         resolve({
//           url: result.url,
//           id: result.public_id,
//         });
//       },
//       {
//         resource_type: "auto",
//         folder: folder,
//       }
//     );
//   });
// };

const storage = new CloudinaryStorage ({
    cloudinary: cloudinary,
    params: {
        folder: "folder name",
        format: async () => 'jpg', 
        public_id: (req, file) => file.filename,
    }
})

const imageExport = multer({storage: storage})
module.exports = imageExport


//link for assistance - https://medium.com/analytics-vidhya/upload-image-in-cloudinary-using-mern-stack-39fcb4ed9d9e