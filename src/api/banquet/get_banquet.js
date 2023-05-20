import axios from "axios"
import { API_URL } from "../../config"

const get_banquet= async ()=> {
    const res= await axios({
        url: API_URL+ "/api/v1/banquet-hall/get",
        method: "get",

    })
    const result= await res.data
    return result
}

export default get_banquet