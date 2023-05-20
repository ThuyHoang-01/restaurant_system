import axios from "axios"
import { API_URL } from "../config"

const signup=async (email, password, firstName, lastName)=> {
    const res= await axios({
        url: API_URL+ "/signup",
        method: "post",
        data: {
            email, password, firstName, lastName
        }
    })
    const result= await res.data
    return result
}

export default signup