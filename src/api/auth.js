import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../config"

const authUser=async ()=> {
    const res= await axios({
        url: API_URL+ "/",
        method: "get",
        params: {
            id_user: Cookies.get("uid") || ""
        }
    })
    const result= await res.data
    return result
}

export default authUser