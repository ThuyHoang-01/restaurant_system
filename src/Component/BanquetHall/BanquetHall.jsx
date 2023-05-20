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
  const navigate = useNavigate();
  const location= useLocation()
  const listBackgroundRandom = [
    "linear-gradient(to right, #77a1d3, #79cbca, #e684ae",
    "linear-gradient(to right, #314755, #26a0da)",
    "linear-gradient(to right, #2b5876, #4e4376)",
    "linear-gradient(to right, #e65c00, #f9d423)",
    "linear-gradient(to right, #2193b0, #6dd5ed)",
    "linear-gradient(to right, #cc2b5e, #753a88)",
    "linear-gradient(to right, #ec008c, #fc6767",
  ];
  const [data, setData] = useState([]);
  const [change, setChange] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const result = await get_banquet();
      return setData(result);
    };
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [change]);
  useEffect(()=> {
    if(location.state?.order_id) {
      setOrderId(location.state?.order_id)
    }
  }, [location.state])
  return (
    <>
      <Header />
      <div className={"banquet-hall"}>
        <Grid container>
          {data?.map((item, key) => (
            <Grid
              margin={1}
              key={key}
              item
              xs={3}
              padding={1}
              style={{ borderRadius: 10, background: "#fff" }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: 4 / 2,
                  background:
                    listBackgroundRandom[
                      Math.floor(Math.random() * listBackgroundRandom.length)
                    ],
                }}
              ></div>
              <div style={{ margin: "8px 0", fontWeight: 600, fontSize: 18 }}>
                {item?.banquet_hall_name}
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
                {item?.is_locked === 0 && (
                  <div
                    className={"c-flex-center"}
                    style={{ justifyContent: "flex-start" }}
                  >
                    <AiFillUnlock style={{ color: "#2dc275" }} />
                    <span style={{ color: "#2dc275" }}>Đang mở</span>
                  </div>
                )}
                {item?.is_locked === 1 && (
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
                          const result = await book_banquet_hall(
                            item?.banquet_hall_id, orderId
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
                                  return null;
                                }
                              });
                            })
                            .catch(() => {
                              swal("Thông báo", result?.message, "error");
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
