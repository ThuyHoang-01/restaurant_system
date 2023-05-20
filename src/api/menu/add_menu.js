import axios from "axios"
import { API_URL } from "../../config"

const add_menu= async (menu_name, menu_description, menu_photo, id, dishList)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/menu/add",
        method: "post",
        data: {
            menu_name, menu_description, id, dishList, menu_photo
        }
    })
    const result= await res.data
    return result
}

export default add_menu