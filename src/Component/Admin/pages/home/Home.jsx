// import Chart from "../../components/chart/Chart";
// import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
// import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import Revenue from "./Revenue";

export default function Home() {
  return (
    <div className="home">
      <Revenue />
      {/* <FeaturedInfo /> */}
      {/* <Chart data={userData} title="Doanh thu 7 ngày qua" grid dataKey="Doanh thu"/> */}
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
