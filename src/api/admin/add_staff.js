import axios from "axios"
import { API_URL } from "../../config"

const add_staff= async(firstName, lastName, email, phone, password)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/add_staff",
        method: "post",
        data: {
            firstName, lastName, email, phone, password
        }
    })
    const result= await res.data
    return result
}

export default add_staff