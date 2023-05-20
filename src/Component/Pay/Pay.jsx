import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {Button } from "antd"
import pay from '../../api/pay/pay';
import { useState } from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Pay(props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading]= useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button type={"primary"} onClick={handleClickOpen}>
        Thanh toán
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Thông tin đơn hàng"}</DialogTitle>
        <DialogContent>
          {props?.componentPay}
        </DialogContent>
        <DialogActions>
          <Button type={"dashed"} onClick={handleClose}>Đóng</Button>
          <Button loading={loading} type={"primary"} onClick={async ()=> {
            setLoading(true)
            const result= await pay(100000)
            setLoading(false)
            window.location.href= result?.payUrl
          }}>Thanh toán</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}