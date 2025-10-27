import { v2 as cloudinary} from "cloudinary";
import fs from "fs"
import { retry } from "react-native-track-player/lib/src/trackPlayer";


// Cloudinary Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath)
            return null
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been upload successfull
        console.log("File has been uploaded!!!", response.url);
        return response
    
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the local saved temp file as upload operation has failed
        return null    
    }
}