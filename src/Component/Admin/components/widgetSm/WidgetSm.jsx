import { useState } from "react";
import "./widgetSm.css";
// import { Visibility } from "@material-ui/icons";
import { useEffect } from "react";
import get_list_new_customer from "../../../../api/admin/new_customer";

export default function WidgetSm() {
  const [data, setData]= useState([])
  useEffect(()=> {
    (async ()=> {
      const result= await get_list_new_customer()
      return setData(result)
    })()
  }, [])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Khách hàng mới</span>
      <ul className="widgetSmList">
        {
          data?.map((item, key)=> <li key={key} className="widgetSmListItem">
            <img
              src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{item?.first_name} {item?.last_name}</span>
            </div>
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{item?.email}</span>
            </div>
            {/* <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              <div>Display</div>
            </button> */}
          </li>)
        }
      </ul>
    </div>
  );
}
