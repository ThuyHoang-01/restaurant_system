import axios from "axios"
import { API_URL } from "../config"

const forgot_password= async (email)=> {
    const res= await axios({
        url: API_URL+ "/forgot-password",
        method: "post",
        data: {
            email
        }
    })
    const result= await res.data
    return result
}

export default forgot_password