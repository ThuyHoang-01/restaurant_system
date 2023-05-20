import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../../config"

const book_banquet_hall= async (banquet_hall_id, order_id)=> {
    const res= await axios({
        url: API_URL+ "/api/v1/book/banquet-hall",
        method: "post",
        data: {
            banquet_hall_id,
            user_id: Cookies.get("uid"),
            order_id
        }
    })
    const result= await res.data
    return result
}

export default book_banquet_hall