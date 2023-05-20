import axios from "axios"
import { API_URL } from "../config"

const get_detail_dish= async (dish_id)=> {
    const res= await axios({
        url: API_URL+ "/api/v1/dish",
        method: "get",
        params: {
            dish_id
        }
    })
    const result= await res.data
    return result
}

export default get_detail_dish