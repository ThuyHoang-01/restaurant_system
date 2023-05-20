import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useState } from "react";
import { Button } from "antd";
import { List, ListItem, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import create_order_request from "../../../../api/user/create_order_request";
import swal from "sweetalert";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewOrderPayment(props) {
  const location= useLocation()
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [deposit, setDeposit]= useState(false)
  const [open, setOpen] = React.useState(false);
  useEffect(()=> {
    if(location.state?.is_open_new_order=== true) {
      setName(location.state?.user?.username)
      setEmail(location.state?.user?.email)
      setPhone(location?.state?.user?.phone)
      setOpen(()=> true)
    }
  }, [location.state])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setDeposit(event.target.value);
  };

  return (
    <div>
      <Button type={"primary"} variant="outlined" onClick={handleClickOpen}>
        Tạo đơn hàng mới
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Tạo đơn hàng mới"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <List>
              <ListItem>
                <TextField
                  style={{ width: 350 }}
                  label={"Họ tên khách hàng"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </ListItem>
              <ListItem>
                <TextField
                  style={{ width: 350 }}
                  label={"Số điện thoại"}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </ListItem>
              <ListItem>
                <TextField
                  style={{ width: 350 }}
                  label={"Email (nếu có)"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </ListItem>
              <ListItem>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Đặt cọc</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={deposit}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={true}>Đã đặt cọc</MenuItem>
                    <MenuItem value={false}>Chưa đặt cọc</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button type={"primary"} onClick={async ()=> {
            const result = await create_order_request(name, phone, email, deposit)
            if(result?.add=== true ) {
                swal("Thông báo", "Bạn đã tạo đơn hàng thành công", "success")
                .then(()=> null)
                .then(()=> handleClose())
                .then(()=> props?.setChange(prev=> !prev))
            }
          }}>
            Tạo
          </Button>
          <Button onClick={handleClose}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
