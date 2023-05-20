import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../config"

const update_info_user= async (firstName, lastName, email)=> {
    const res= await axios({
        url: API_URL+ "/api/user/update",
        method: "post",
        data: {
            firstName, lastName, email, idUser: Cookies.get("uid")
        }
    })
    const result= await res.data

    return result
}

export default update_info_user