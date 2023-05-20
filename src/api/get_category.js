import axios from "axios"
import { API_URL } from "../config"

const get_category= async ()=> {
    const res= await axios({
        url: API_URL+ "/api/v1/category",
        method: "get",
    })
    const result= await res.data
    return result
}

export default get_category