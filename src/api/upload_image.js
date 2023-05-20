import axios from "axios"
import { API_URL } from "../config"

const upload_image= async (img)=> {
    const res= await axios({
        url: API_URL+ "/api/v1/upload-image",
        method: "post",
        data: {
            image: img
        }
    })
    const result= await res.data
    return result
}

export default upload_image