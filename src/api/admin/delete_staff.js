import axios from "axios"
import { API_URL } from "../../config"

const delete_staff= async (user_id)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/staff/delete",
        method: "post",
        data: {
            user_id
        }
    })
    const result= await res.data
    return result
}

export default delete_staff