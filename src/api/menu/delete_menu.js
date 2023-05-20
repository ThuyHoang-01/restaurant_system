import axios from "axios"
import { API_URL } from "../../config"

const delete_menu= async (id)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/menu/delete",
        method: "post",
        data: {
            id
        }
    })
    const result= await res.data
    return result
}

export default delete_menu