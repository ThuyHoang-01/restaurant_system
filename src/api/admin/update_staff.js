import axios from "axios"
import { API_URL } from "../../config"

const update_staff= async (first_name, last_name, email, user_id)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/staff/update",
        method: "post",
        data: {
            first_name, last_name, email, user_id
        },
    })
    const result= await res.data

    return result
}

export default update_staff