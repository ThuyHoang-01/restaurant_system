import axios from "axios"
import { API_URL } from "../config"

const reset_password= async (email, password)=> {
    const res= await axios({
        url: API_URL+ "/reset-password",
        method: "post",
        data: {
            email, password
        }
    })
    const result= await res.data
    return result
}

export default reset_password