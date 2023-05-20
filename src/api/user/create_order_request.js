import axios from "axios"
import { API_URL } from "../../config"

const create_order_request= async (user_name, phone, email, deposit)=> {
    const res= await axios({
        url: API_URL+ "/api/order-request/add",
        method: "POST",
        data: {
            user_name, phone, email, deposit
        }
    })
    const result= await res.data
    return result
}

export default create_order_request