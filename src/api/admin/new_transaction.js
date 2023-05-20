import axios from "axios"
import { API_URL } from "../../config"

const get_list_new_transaction= async ()=> {
    const res= await axios({
        url: API_URL+ "/api/v3/new/transaction",
        method: "get"
    })
    const result= await res.data
    return result
}

export default get_list_new_transaction