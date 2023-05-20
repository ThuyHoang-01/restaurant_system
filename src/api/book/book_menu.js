import axios from "axios"
import { API_URL } from "../../config"
import Cookies from "js-cookie"

const book_menu= async (menu_id, amount, order_id)=> {
    const res= await axios({
        url: API_URL+ "/api/v1/book/menu",
        method: "post",
        data: {
            menu_id,
            user_id: Cookies.get("uid"),
            amount,
            order_id
        }
    })
    const result= await res.data
    return result
}

export default book_menu