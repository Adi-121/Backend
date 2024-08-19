import {v2 as cloudinary} from "cloudinary"

// fs here means file systemm and we use it to perfoem operations of the file system like here deleting (unlink) the file from server
import fs from "fs"

// here we have just configured cloudinary to accept whatever we upload
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) =>{
  try {
    if(!localFilePath) return null;

    // upload the file on cloudinary
    const response = cloudinary.uploader.upload(localFilePath, {
      resource_type : "auto",
    })

    //file has been uploaded successfully
    console.log("file has been uploaded successfully on clodinary ", response.url);
    return response;

  } catch (error) {
    // remove the locally saved temporary file as the upload operation got failed
    fs.unlinkSync(localFilePath);

    return null;
  }
}


export {uploadOnCloudinary}