import axios from "axios"
import { API_URL } from "../config"

const recover_password= async (email, code)=> {
    const res= await axios({
        url: API_URL+ "/recover-password",
        method: "post",
        data: {
            email, code
        }
    })
    const result= await res.data
    return result
}

export default recover_password