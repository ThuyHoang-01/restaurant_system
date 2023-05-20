import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../config"

const edit_blog= async (content, image, title, id)=> {
    const res= await axios({
        url: API_URL + "/api/v3/blog/edit",
        method: "post",
        data: {
            content, time_created: new Date(),
            image,
            title,
            id
        },
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken")
        }
    })
    const result= await res.data
    return result
}

export default edit_blog