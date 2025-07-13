import { v2 as cloudinary } from "cloudinary";

export const uploadCloudinary = async (filename) => {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(filename, {
      resource_type: "auto",
    })
    .catch((error) => {
      console.log(error);
    });

  return uploadResult.secure_url;

};
