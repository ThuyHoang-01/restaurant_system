import axios from "axios"
import { API_URL } from "../../config"

const get_banquet_detail= async (banquet_hall_id)=> {
    const res= await axios({
        url: API_URL+ "/api/v1/banquet-hall/get/detail",
        method: "get",
        params: {
            banquet_hall_id
        }

    })
    const result= await res.data
    return result
}

export default get_banquet_detail