import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";
import { useState } from "react";
import swal from "sweetalert";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../App";
import add_custom_dish from "../../api/add_custom_dish";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FoodOnDemand(props) {
  const location = useLocation();
  const { setOrderId, orderId } = useContext(AppContext);
  const [dishName, setDishName] = useState("");
  const [dishDescription, setDishDescription] = useState("");
  const [dishPrice, setDishPrice] = useState();
  const [dishAmount, setDishAmount] = useState();
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if (location.state?.order_id) {
      setOrderId(location.state?.order_id);
    }
  }, [location.state]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setDishPrice();
    setDishAmount();
    setDishName("");
    setDishDescription("");
    setOpen(false);
  };

  return (
    <div>
      <div variant="outlined" onClick={handleClickOpen}>
        Món theo yêu cầu
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Đặt món theo yêu cầu"}</DialogTitle>
        <DialogContent>
          <TextField
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            label={"Tên món ăn"}
            style={{ width: 550, height: 40, margin: "12px 0" }}
          />
          <TextField
            value={dishDescription}
            onChange={(e) => setDishDescription(e.target.value)}
            label={"Mô tả"}
            style={{ width: 550, height: 40, margin: "12px 0" }}
          />
          <TextField
            value={dishPrice}
            onChange={(e) => {
              setDishPrice(e.target.value);
            }}
            type={"text"}
            label={"Giá tiền"}
            style={{ width: 550, height: 40, margin: "12px 0" }}
          />
          <TextField
            value={dishAmount}
            onChange={(e) => {
              setDishAmount(e.target.value);
            }}
            type={"text"}
            label={"Số lượng"}
            style={{ width: 550, height: 40, margin: "12px 0" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Đóng</Button>
          <Button
            onClick={async () => {
              if(dishName.length <= 0) {
                return swal(
                  "Thông báo",
                  "Tên món ăn không được để trống",
                  "error"
                );
              }
              if(dishDescription?.length <= 0) {
                return swal(
                  "Thông báo",
                  "Mô tả món ăn không được để trống",
                  "error"
                );
              }
              if(dishAmount?.toString()?.length <=0 || !dishAmount) {
                return swal(
                  "Thông báo",
                  "Số lượng món ăn không được để trống",
                  "error"
                );
              }
              if(dishPrice?.toString()?.length <=0 || !dishPrice) {
                return swal(
                  "Thông báo",
                  "Giá món ăn không được để trống",
                  "error"
                );
              }
              if (parseInt(dishAmount) < 0 || parseInt(dishAmount) === undefined) {
                return swal(
                  "Thông báo",
                  "Số lượng món không hợp lệ, Vui lòng thử lại ",
                  "error"
                );
              }
              if (parseInt(dishPrice) < 0|| parseInt(dishPrice) === undefined) {
                return swal(
                  "Thông báo",
                  "Giá món không hợp lệ, Vui lòng thử lại ",
                  "error"
                );
              } 
                const result = await add_custom_dish(
                  orderId,
                  dishName,
                  dishDescription,
                  dishPrice,
                  dishAmount
                );
                swal("Thông báo", "Yêu cầu đặt món thành công", "success")
                  .then(() => handleClose())
                  .then(() => props?.handleClose());
            }}
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
