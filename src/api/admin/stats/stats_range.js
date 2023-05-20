import axios from "axios"
import { API_URL } from "../../../config"

const stats_range= async ( time_start, time_end)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/stats/range",
        method: "get",
        params: {
            time_start, time_end
        }
    })
    const result= await res.data
    return result
}

export default stats_range