import axios from "axios"
import { API_URL } from "../../config"

const update_order_request= async (order_request, user_name, phone, email, deposit, amount_deposit)=> {
    const res= await axios({
        url: API_URL+ "/api/v2/update/order-request",
        method: "post",
        data: {
            order_request, user_name, phone, email, deposit, amount_deposit
        }
    })
    const result= await res.data
    return result
}

export default update_order_request