import axios from "axios"
import { API_URL } from "../../config"

const delete_banquet = async (banquet_id)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/banquet-hall/delete",
        method: "post",
        data: {
            banquet_id
        }
    })
    const result= await res.data
    return result
}

export default delete_banquet 