import axios from "axios"
import { API_URL } from "../../config"

const add_dish= async (dish_name, dish_description, dish_price, image, )=> {
    const res= await axios({
        url: API_URL+ "/api/v3/dish/add",
        method: "post",
        data: {
            dish_name, dish_description, dish_price, image
        }

    })
    const result= await res.data
    return result
}

export default add_dish