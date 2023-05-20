import axios from "axios"
import { API_URL } from "../../config"

const delete_order_request= async (order_request)=> {
    const res= await axios({
        url: API_URL+ "/api/v2/order-request",
        method: "delete",
        data: {
            order_request
        }
    })
    const result= await res.data
    return result
}

export default delete_order_request