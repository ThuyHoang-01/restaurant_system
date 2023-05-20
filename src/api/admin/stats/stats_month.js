import axios from "axios"
import { API_URL } from "../../../config"


const stats_month= async (time)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/stats/month",
        method: "get",
        params: {
            time
        }
    })
    const result= await res.data
    return result
}

export default stats_month