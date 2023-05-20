import axios from "axios"
import { API_URL } from "../../config"

const update_banquet= async (banquet_hall_name, time_start, time_end, service_guest, banquet_hall_id, time, price)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/banquet-hall/update",
        method: "post",
        data: {
            banquet_hall_name, time_start, time_end, service_guest, banquet_hall_id, time, price
        }
    })
    const result= await res.data
    return result
}

export default update_banquet