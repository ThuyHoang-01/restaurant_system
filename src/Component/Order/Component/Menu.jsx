import { Button, Grid } from "@mui/material";
import React, { useContext, useState } from "react";
import numberWithCommas from "../../util/numberThousandSeparator";
import _ from "lodash";
import MenuDish from "./MenuDish";
import Swal from "sweetalert2";
import { AppContext } from "../../../App";
import book_menu from "../../../api/book/book_menu";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const Menu = ({ item }) => {
  // eslint-disable-next-line
  const [selectMenu, setSelectMenu] = useState(true);
  const { auth, user, orderId } = useContext(AppContext);

  const navigate = useNavigate();

  return (
    <Grid item xs={6}>
      <div
        style={{
          width: "100%",
          height: 50,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#f00",
          padding: 8,
        }}
      >
        <div style={{ fontSize: 20, color: "#fff" }}>{item?.menu_name}</div>
        <div style={{ color: "#fff" }}>
          {numberWithCommas(
            _.sumBy(JSON.parse(item?.menu_dishes), function (e) { 
              return parseInt(e?.price); 
              /*  hiển thị giá kiểu số nguyên + VNĐ*/
            })
          )}{" "}
          VNĐ
        </div>
      </div>
      <img
        style={{ width: "100%", aspectRatio: 5 / 3, objectFit: "cover" }}
        src={item?.menu_photo}
        alt="Can't open"
      />
      <Grid xs={12}>
        {JSON.parse(item?.menu_dishes)?.map((item, key) => (
          <MenuDish selectMenu={selectMenu} key={key} item={item} />
        ))}
      </Grid>
      <Grid xs={12} style={{ background: "#555", padding: 10 }}>
        {/* <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            variant={"contained"}
            onClick={() => {
              setSelectMenu(true);
            }}
          >
            Chọn tất cả
          </Button>
          <Button
            onClick={() => {
              setSelectMenu(false);
            }}
            color={"error"}
            variant={"contained"}
          >
            Xóa tất cả
          </Button>
        </Box> */}
        {parseInt(user?.role) === 2 && (
          <div style={{ margin: "8px 0" }}>
            <Button
              onClick={async () => {
                if (selectMenu === true) {
                  const { value: text } = await Swal.fire({
                    input: "text",
                    inputLabel: "Số lượng",
                    inputPlaceholder: "Nhập số lượng menu cần đặt",
                    inputAttributes: {
                      "aria-label": "Type your message here",
                    },
                    showCancelButton: true,
                  });

                  if (text) {
                    if (auth === true) {
                      try {
                        const result = await book_menu(
                          item?.menu_id,
                          parseInt(text),
                          orderId
                        );
                        if (result?.status === 200) {
                          swal("Thông báo", "Đặt menu thành công", "success");
                        } else {
                          swal("Thông báo", "Lỗi không xác định", "error");
                        }
                      } catch (e) {
                        swal("Thông báo", "Lỗi không xác định", "error");
                      }
                    } else {
                      swal(
                        "Thông báo",
                        "Bạn cần đăng nhập để tiếp tục",
                        "error"
                      );
                    }
                  } else {
                    swal(
                      "Thông báo",
                      "Bạn cần nhập số lượng menu cần đặt",
                      "error"
                    );
                  }
                }
              }}
              type={"primary"}
              style={{
                fontSize: 18,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 16,
              }}
              variant={"contained"}
              color={"primary"}
            >
              Đặt
            </Button>
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default Menu;
