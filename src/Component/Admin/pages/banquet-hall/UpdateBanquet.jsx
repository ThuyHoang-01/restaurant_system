import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
// import AddIcon from '@mui/icons-material/Add';
import { Button } from "antd";
// import { TextField } from '@mui/material';
import swal from 'sweetalert';
// import update_category from '../../../../api/category/update_category';
import { TextField } from '@mui/material';
import { TimePicker } from 'antd';
import update_banquet from '../../../../api/banquet/update_banquet';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateBanquet(props) {
  const [open, setOpen] = React.useState(false);
  const [id, setId]= React.useState(props?.id)
  const [banquetHallName, setBanquetHallName]= React.useState(props?.banquet_hall_name)
  const [time, setTime]= React.useState([])
  const [serviceGuest, setServiceGuest]= React.useState(props?.service_guest)
  const [price, setPrice]= React.useState(props?.price)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Button type={"primary"} onClick={handleClickOpen} style={{margin: "8px 0", display: "flex", alignItems: "center"}}>
          Update
        </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Cập nhật sảnh"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField style={{width: "100%", marginBottom: 12}} value={banquetHallName} onChange={(e)=> setBanquetHallName(e.target.value)} placeholder={"Tên sảnh tiệc"} />
            <TimePicker.RangePicker format={"HH:mm:ss"} value={time} onCalendarChange={(e)=> setTime(e)} className={"time-picker-range"} style={{height: 56, width: "100%", marginBottom: 12}} />
            <TextField style={{width: "100%", marginBottom: 12}} value={serviceGuest} onChange={(e)=> setServiceGuest(e.target.value)} placeholder={"Số khách phục vụ"} />
            <TextField style={{width: "100%", marginBottom: 12}} value={price} onChange={(e)=> setPrice(e.target.value)} placeholder={"Giá sảnh"} />

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button type={"primary"} color={"facebook"} onClick={async ()=> {
              if(banquetHallName.trim().length <= 0) {
                return swal("Thông báo", "Tên sảnh không được để trống", "error" )
              }
              if(parseInt(price) < 0 || typeof parseInt(price) !== "number") {
                return swal("Thông báo", "Giá sảnh không hợp lệ, Vui lòng thử lại", "error" )
              }
              const result= await update_banquet(banquetHallName, time[0]?.format("HH:mm:ss") || "", time[1]?.format("HH:mm:ss") || "", parseInt(serviceGuest), id, time, price)
              if(result?.update=== true) {
                swal("Thông báo", "Bạn đã cập nhật thành công", "success")
                .then(()=> {
                  handleClose()
                  setBanquetHallName("")
                  setTime([])
                  setServiceGuest("")
                  props?.setChange(prev=> !prev)
                })
              }
              else {
                swal("Thông báo", "Error", "error")
              }
          }}>Lưu</Button>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}