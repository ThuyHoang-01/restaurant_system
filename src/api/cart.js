import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../config"

const cart= {
    getCart: async ()=> {
        const res= await axios({
            url: API_URL+ "/api/v1/user/cart",
            method: "get",
            params: {
                user_id: Cookies.get("uid")
            }
        })
        const result= await res.data
        return result
    },
    addToCart: async ()=> {
        const res= await axios({
            url: API_URL+ "/api/v1/user/cart/add",
            method: "post",
            data: {

            }
        })
        const result= await res.data
        return result
    }
}

export default cart