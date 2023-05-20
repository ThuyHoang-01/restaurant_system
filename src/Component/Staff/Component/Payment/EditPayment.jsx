import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useState } from 'react';
import { Button } from 'antd'
import { FormControl, InputLabel, List, ListItem, Select, TextField } from '@mui/material';
import MenuItem from "@mui/material/MenuItem";
import update_order_request from '../../../../api/staff/update_order_request';
import swal from 'sweetalert';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditPayment(props) {
  const [userName, setUserName]= useState(props?.user_name)
  const [phone, setPhone]= useState(props?.phone)
  const [email, setEmail]= useState(props?.email)
  const [deposit, setDeposit]= useState(props?.deposit)
  const [open, setOpen] = React.useState(false);

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
      <Button disabled={props?.paid=== 0 ? false : true} type={"primary"} variant="outlined" onClick={handleClickOpen}>
        Cập nhật
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Cập nhật thông tin"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <List>
                <ListItem>
                    <TextField style={{width: 350}} label={"Tên khách hàng"} value={userName} onChange={(e)=> setUserName(e.target.value)} />
                </ListItem>
                <ListItem>
                    <TextField style={{width: 350}} label={"Số điện thoại"} value={phone} onChange={(e)=> setPhone(e.target.value)} />
                </ListItem>
                <ListItem>
                    <TextField style={{width: 350}} label={"Email"} value={email} onChange={(e)=> setEmail(e.target.value)} />
                </ListItem>
                <ListItem>
                <FormControl className={"wrap-ooo"} fullWidth>
                  <InputLabel id="demo-simple-select-label">Đặt cọc</InputLabel>
                  <Select
                    className={"wrap-mode-deposit"}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={deposit}
                    label="Age"
                    onChange={handleChange}
                    renderValue={()=> {
                      return deposit=== 1 ? "Đã đặt cọc" : "Chưa đặt cọc"
                    }}
                  >
                    <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", gap: 10}}>
                    <MenuItem className={"i-dep"} style={{padding: 10}} value={1}>Đã đặt cọc</MenuItem>
                    <MenuItem className={"i-dep"} style={{padding: 10}} value={0}>Chưa đặt cọc</MenuItem>
                    </div>
                  </Select>
                </FormControl>
              </ListItem>
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button type={"primary"} onClick={async ()=> {
              const result= await update_order_request(props?.id, userName, phone, email, deposit)
              if(result?.update=== true) {
                swal("Thông báo", "Cập nhật thành công", "success")
                .then(()=> props?.setChange(prev=> !prev))
              }
              else {
                swal("Thông báo", "Cập nhật thất bại", "error")
              }
              handleClose()
            }}>Cập nhật</Button>
          <Button onClick={handleClose}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}