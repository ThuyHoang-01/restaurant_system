import axios from "axios"
import { API_URL } from "../../config"

const get_detail_staff= async (staff_id)=> {
    const res= await axios({
        url: API_URL+ "/api/v2/staff/get/detail",
        method: "get",
        params: {
            staff_id
        }
    })
    const result= await res.data
    return result
}

export default get_detail_staff