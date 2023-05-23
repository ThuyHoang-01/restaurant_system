import { Grid } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import get_banquet from "../../api/banquet/get_banquet";
import Header from "../Header/Header";
import moment from "moment";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { Button } from "antd";
import DetailBanquetHall from "./DetailBanquetHall";
import swal from "sweetalert";
import { useLocation, useNavigate } from "react-router-dom";
import book_banquet_hall from "../../api/book/book_banquet_hall";
import { AppContext } from "../../App";

const BanquetHall = () => {
  const { auth, user, orderId, setOrderId } = useContext(AppContext);
  //Sử dụng `useContext` để lấy giá trị của `auth`, `user`, `orderId` và `setOrderId` 
  //Từ context được cung cấp bởi `AppContext`. `useNavigate` và `useLocation` để truy cập vào router và URL hiện tại của trang.
  const navigate = useNavigate();
  const location= useLocation()
  const listBackgroundRandom = [ // trả ra các hình ảnh tron trang
    "linear-gradient(to right, #77a1d3, #79cbca, #e684ae",
    "linear-gradient(to right, #314755, #26a0da)",
    "linear-gradient(to right, #2b5876, #4e4376)",
    "linear-gradient(to right, #e65c00, #f9d423)",
    "linear-gradient(to right, #2193b0, #6dd5ed)",
    "linear-gradient(to right, #cc2b5e, #753a88)",
    "linear-gradient(to right, #ec008c, #fc6767",
  ];
  //state `data` lưu trữ dữ liệu đang được hiển thị và `change` để xác định sự thay đổi của dữ liệu.
  const [data, setData] = useState([]);
  const [change, setChange] = useState(false);
  useEffect(() => { //Sử dụng `useEffect` để fetch dữ liệu từ API bằng hàm `get_banquet` bằng cách sử dụng `async/await`
    const fetchData = async () => { //Kết quả trả về được lưu vào state `data` thông qua hàm `setData`
      const result = await get_banquet();
      return setData(result);
    };
    fetchData();
    const intervalId = setInterval(() => { //Tiếp theo, sử dụng `setInterval` để cập nhật dữ liệu tự động mỗi 5 giây đồng thời clearInterval khi component unmount.
      fetchData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [change]);
  // `useEffect` thứ hai để kiểm tra xem có giá trị của `order_id` trong location state không và đặt giá trị `order_id` 
  // cho state `orderId` thông qua hàm `setOrderId` để truyền giá trị `order_id` qua cho component khác.
  useEffect(()=> {
    if(location.state?.order_id) {
      setOrderId(location.state?.order_id)
    }
  }, [location.state])
  return (
    <>
      <Header />  {/* Mở đầu cho đặt sảnh */}
      <div className={"banquet-hall"}> 
        <Grid container>  {/* Hiển thị danh sách các phòng tiệc cưới (banquet halls). */}
          {data?.map((item, key) => ( 
            // hàm `map` trên mảng `data` để lặp lại và hiển thị các phòng tiệc cưới với thông tin tương ứng cho mỗi phần tử trong mản
             
            <Grid
              margin={1}
              key={key}
              item //Mỗi phòng tiệc cưới được hiển thị bằng cách sử dụng Grid item với kích thước là `xs={3}`
              xs={3}
              padding={1}
              style={{ borderRadius: 10, background: "#fff" }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: 4 / 2, //giới hạn kích thước ảnh
                  background:
                    listBackgroundRandom[
                      Math.floor(Math.random() * listBackgroundRandom.length)
                    ],
                }}
              ></div>
              <div style={{ margin: "8px 0", fontWeight: 600, fontSize: 18 }}>
                {item?.banquet_hall_name} {/* hiển thị tên tiệc cưới */}
                
              </div>
              <div style={{ margin: "8px 0" }}> 
                Thời gian mở:{" "}
                {moment(item?.time_start, "HH:mm:ss").format("HH:mm:ss")}
              </div>
              <div style={{ margin: "8px 0" }}>
                Thời gian đóng:{" "}
                {moment(item?.time_end, "HH:mm:ss").format("HH:mm:ss")}
              </div>
               
              <div style={{ margin: "8px 0" }}>
                Trạng thái:{" "}
                {item?.is_locked === 0 && (  //TIỆC CƯỚI = 0 ĐANG MỞ
                  <div
                    className={"c-flex-center"}
                    style={{ justifyContent: "flex-start" }}
                  >
                    <AiFillUnlock style={{ color: "#2dc275" }} />
                    <span style={{ color: "#2dc275" }}>Đang mở</span>
                  </div>
                )}
               
                {item?.is_locked === 1 && (  //TIỆC CƯỚI = 1 ĐANG KHÓA
                  <div
                    className={"c-flex-center"}
                    style={{ justifyContent: "flex-start" }}
                  >
                    <AiFillLock style={{ color: "red" }} />
                    <span style={{ color: "red" }}>Đã khóa</span>
                  </div>
                )}
              </div>
              
              <div
                className={"c-flex-center"}
                style={{ gap: 10, flexWrap: "wrap" }}
              >

           
                {
                  parseInt(user?.role)=== 2 && <>
                {item?.is_locked=== 0 && <Button
                  type={"primary"}
                  onClick={() => {
                    swal("Thông báo", "Bạn có muốn đặt sảnh này không ?", {
                      buttons: {
                        ok: "Xác nhận",
                        cancel: "Hủy",
                      },
                    }).then(async (value) => {
                      if (value === "ok") {
                        if (auth === true) {
                          const result = await book_banquet_hall( // sử dujnh await để đợi hàm book trả result về
                            item?.banquet_hall_id, orderId //  và trả về một promise.
                          )
                            .then(() => {
                              setChange((prev) => !prev);
                              swal(
                                "Thông báo",
                                "Đặt sảnh thành công",
                                "success",
                                {
                                  buttons: {
                                    ok: "Tiếp tục đặt",
                                    cancel: "Đóng",
                                  },
                                }
                              ).then((value) => {
                                if (value === "ok") {
                                  navigate("/order");
                                } else {
                                  return null; // ở lại tại trang web 
                                }
                              });
                            })
                            .catch(() => {
                              swal("Thông báo", result?.message, "error"); // lỗi do API
                            });
                        }
                        else {
                          swal("Thông báo", "Bạn phải đăng nhập để đặt sảnh", "error  ")
                        } 
                      }
                      else {
                        return null;
                      }
                    });
                  }}
                >
                  Đặt sảnh
                </Button>}
                {item?.is_locked=== 1 && <Button
                  disabled
                  type={"dashed"}
                  onClick={() => {
                  }}
                >
                  Đã đặt
                </Button>}
                </>

                }
                <DetailBanquetHall banquet_id={item?.banquet_hall_id} />
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default BanquetHall;
