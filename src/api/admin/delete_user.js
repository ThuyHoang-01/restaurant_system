import axios from "axios"
import { API_URL } from "../../config"

const delete_user= async (user_id)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/user/delete",
        method: "post",
        data: {
            user_id
        }
    })
    const result= await res.data
    return result
}

export default delete_user