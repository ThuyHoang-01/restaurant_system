import axios from "axios"
import { API_URL } from "../config"

const add_blog= async (content, image, title)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/blogs/add",
        method: "post",
        data: {
            content, time_created: new Date(),
            image,
            title
        },
    })
    const result= await res.data
    return result
}

export default add_blog