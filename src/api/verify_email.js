import axios from "axios"
import { API_URL } from "../config"

const verify_email =async (email, password, firstName, lastName, code)=> {
    const res= await axios({
        url: API_URL+ "/verify",
        method: "post",
        data: {
            email, password, firstName, lastName, code: parseInt(code)
        }
    })
    const result= await res.data
    return result
}

export default verify_email 