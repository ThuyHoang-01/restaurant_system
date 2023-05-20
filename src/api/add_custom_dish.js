import axios from "axios"
import { API_URL } from "../config"
import Cookies from "js-cookie"

const add_custom_dish= async (order_id, dishName, dishDescription, dishPrice, dishAmount) => {
    const res= await axios({
        url: API_URL+ "/api/v2/book/dish/custom",
        method: "post",
        data: {
            order_id,
            dishName,
            dishDescription,
            dishPrice, 
            dishAmount,
            user_id: Cookies.get("uid")
        }
    })
    const result= await res.data
    return result
}

export default add_custom_dish