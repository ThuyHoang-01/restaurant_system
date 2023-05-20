import { List, ListItem } from "@mui/material";
import { Box } from "@mui/system";
import { Button, Image } from "antd";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import cart from "../../api/cart";
import Header from "../Header/Header";
import Pay from "../Pay/Pay";

const Cart = () => {
  // eslint-disable-next-line
  const [change, setChange] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await cart.getCart();
      return setData(result);
    })();
  }, [change]);
  return (
    <>
      <Header />
      <Box sx={{ width: "100%", padding: 10 }}>
        <List>
          {data?.map((item, key) => (
            <ListItem
              key={item?.cart_id}
              style={{ background: "#fff", borderRadius: 10, margin: "12px 0" }}
            >
              <div style={{ width: "100%" }}>
                {item?.banquet_hall_id?.length > 0 && (
                  <>
                    {item?.banquet_hall_name}
                    
                    <div>
                      Đã đặt:{" "}
                      {moment(item?.time_created).format("DD-MM-YYYY HH:mm:ss")}
                    </div>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row-reverse",
                        alignItems: "center",
                      }}
                    >
                      <>
                        {/* {item?.state === 0 && (
                          <Pay componentPay={<div>Hello World</div>} />
                        )}
                        {item?.state === 1 && (
                          <Button
                            type={"dashed"}
                            disabled={true}
                            style={{ marginLeft: 10 }}
                          >
                            Đã thanh toán
                          </Button>
                        )} */}
                      </>
                      {/* <Button type={"link"}>Xem hóa đơn</Button> */}
                    </div>
                  </>
                )}
                {item?.dish_id?.length > 0 && (
                  <>
                    <div style={{ display: "flex", gap: 10 }}>
                      <Image
                        src={item?.image_dish}
                        style={{
                          width: 150,
                          aspectRatio: 2 / 2,
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <div>{item?.dish_name}</div>
                        <div>
                          Đã đặt:{" "}
                          {moment(item?.time_created).format(
                            "DD-MM-YYYY HH:mm:ss"
                          )}
                        </div>
                        <div>
                        Số lượng:{" "}
                          {(item?.amount_dish)}
                        </div>
                        <br />
                        <div style={{display: "flex", alignItems: "center"}}>
                          {/* <Button type={"link"}>Xem hóa đơn</Button> */}
                          {/* {item?.state === 0 && (
                            <Pay componentPay={<div></div>} />
                          )} */}
                          {/* {item?.state === 1 && (
                            <Button
                              type={"dashed"}
                              disabled={true}
                              style={{ marginLeft: 10 }}
                            >
                              Đã thanh toán
                            </Button>
                          )}
                           */}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {/*  */}
                {item?.menu_id?.length > 0 && (
                  <>
                    <div style={{ display: "flex", gap: 10 }}>
                      <Image
                        src={item?.menu_photo}
                        style={{
                          width: 150,
                          aspectRatio: 2 / 2,
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <div>{item?.menu_name}</div>
                        <div>
                          Đã đặt:{" "}
                          {moment(item?.time_created).format(
                            "DD-MM-YYYY HH:mm:ss"
                          )}
                        </div>
                        <div>
                        Số lượng:{" "}
                          {(item?.amount_menu)}
                        </div>
                        <br />
                        <div style={{display: "flex", alignItems: "center"}}>
                          {/* <Button type={"link"}>Xem hóa đơn</Button> */}
                          {/* {item?.state === 0 && (
                            <Pay componentPay={<div>Hello World</div>} />
                          )} */}
                          {/* {item?.state === 1 && (
                            <Button
                              type={"dashed"}
                              disabled={true}
                              style={{ marginLeft: 10 }}
                            >
                              Đã thanh toán
                            </Button>
                          )} */}
                          
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default Cart;
