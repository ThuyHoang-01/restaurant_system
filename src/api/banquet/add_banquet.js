import axios from "axios"
import { API_URL } from "../../config"

const add_banquet= async (banquet_hall_name, time_start, time_end, service_guest, price)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/banquet-hall/add",
        method: "post",
        data: {
            banquet_hall_name, time_start, time_end, service_guest, price
        }
    })
    const result= await res.data
    return result
}

export default add_banquet