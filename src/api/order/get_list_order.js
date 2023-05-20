import axios from "axios"
import { API_URL } from "../../config"

const get_list_order= async (category_id)=> {
    const res= await axios({
        url: API_URL+ "/order/",
        method: "get",
        params: {
            category_id
        }

    })
    const result= await res.data
    return result
}

export default get_list_order