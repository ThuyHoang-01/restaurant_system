import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "../../config";

const add_to_cart = async (dish_id, menu_id, amount_dish, amount_menu) => {
  const res = await axios({
    url: API_URL + "/api/v1/cart/add",
    method: "post",
    data: {
      user_id: Cookies.get("uid"),
      dish_id,
      menu_id,
      amount_dish,
      amount_menu,
    },
  });
  const result= await res.data;
  return result
};

export default add_to_cart;
