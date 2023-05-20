import axios from "axios"
import { API_URL } from "../../config"

const delete_contact= async (request_id)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/contact",
        method: "delete",
        data: {
            request_id
        }
    })
    const result= await res.data
    return result
}

export default delete_contact