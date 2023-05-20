import axios from "axios"
import { API_URL } from "../config"

const login=async (email, password)=> {
    const res= await axios({
        url: API_URL+ "/login",
        method: "post",
        data: {
            email, password
        }
    })
    const result= await res.data
    return result
}

export default login