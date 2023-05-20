import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../config"

const bill= {
    getBill: async (order_id)=> {
        const res= await axios({
            url: API_URL+ "/api/v1/bill/get",
            method: "get",
            params: {
                user_id: Cookies.get("uid"), order_id
            }
        })
        const result= await res.data
        return result
    }
}

export default bill