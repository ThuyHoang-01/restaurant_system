import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../config"

const delete_blog= async (id)=> {
    const res= await axios({
        url: API_URL + "/api/v3/blog/delete",
        method: "post",
        data: {
            id
        },
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken")
        }
    })
    const result= await res.data
    return result
}

export default delete_blog