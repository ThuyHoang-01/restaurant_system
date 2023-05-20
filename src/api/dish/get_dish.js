import axios from "axios"
import { API_URL } from "../../config"

const get_dish= async ()=> {
    const res= await axios({
        url: API_URL+ "/api/v3/dish/get",
        method: "get"
    })
    const result= await res.data
    return result
}

export default get_dish