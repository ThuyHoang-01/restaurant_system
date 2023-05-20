import axios from "axios"
import { API_URL } from "../../config"

const delete_dish= async (id)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/dish/delete",
        method: "POST",
        data: {
            id
        }
    })
    const result= await res.data
    return result
}

export default delete_dish