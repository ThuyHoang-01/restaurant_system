import axios from "axios"
import { API_URL } from "../../config"

const update_user= async (firstName, lastName, email ,user_id)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/user/update",
        method: "post",
        data: {
            firstName, lastName, email ,user_id
        }
    })
    const result= await res.data
    return result
}

export default update_user