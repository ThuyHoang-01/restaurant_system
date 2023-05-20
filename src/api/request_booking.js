import axios from "axios"
import { API_URL } from "../config"

const request_booking= async (userName, email, phone, guest, type)=> {
    const res= await axios({
        url: API_URL+ "/api/v1/request/booking",
        method: "post",
        data: {
            userName, email, phone, guest, type
        }
    })
    const result= await res.data
    return result
}

export default request_booking