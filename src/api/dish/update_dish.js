import axios from "axios"
import { API_URL } from "../../config"

const update_dish= async (dish_id, dish_name, dish_price, dish_description, image)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/dish/update",
        method: "post",
        data: {
            dish_id, dish_name, dish_price, dish_description, image
        }
    })
    const result= await res.data
    return result
}

export default update_dish