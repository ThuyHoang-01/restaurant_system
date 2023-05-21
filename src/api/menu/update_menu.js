import axios from "axios"
import { API_URL } from "../../config"

const update_menu= async (menu_name, menu_description, image, id, dishList)=> {
    console.log(dishList)
    const res= await axios({
        url: API_URL+ "/api/v3/menu/update",
        method: "post",
        data: {
            menu_name, menu_description, id, image, dishList
        }
    })
    const result= await res.data
    return result
}

export default update_menu