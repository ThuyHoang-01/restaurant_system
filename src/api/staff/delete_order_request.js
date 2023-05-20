import axios from "axios"
import { API_URL } from "../../config"

const delete_order_request= async (order_id)=> {
    const res= await axios({
        url: API_URL+ "/api/v2/order/delete",
        method: "post",
        data: {
            order_id
        }
    })
    const result= await res.data
    return result
}

export default delete_order_request