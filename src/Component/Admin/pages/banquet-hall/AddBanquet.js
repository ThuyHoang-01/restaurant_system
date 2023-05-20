import * as React from 'react';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Button } from "antd";
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { TextField } from '@mui/material';
import { TimePicker } from 'antd';
import add_banquet from '../../../../api/banquet/add_banquet';
import { useSnackbar } from 'notistack';
import swal from 'sweetalert';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddBanquet(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [banquetHallName, setBanquetHallName]= React.useState("")
  const [time, setTime]= React.useState([])
  const [serviceGuest, setServiceGuest]= React.useState("")
  const [price, setPrice]= React.useState()
  const { enqueueSnackbar } = useSnackbar();
  return (
    <div>
      <Button onClick={handleClickOpen} style={{display: "flex", justifyContent: "center", alignItems: "center"}} type={"primary"} icon={<AddIcon />}>Thêm sảnh</Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Thêm sảnh tiệc"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <List>
                <ListItem style={{width: 400, margin: "16px 0"}} disablePadding>
                    <TextField value={banquetHallName} onChange={(e)=> setBanquetHallName(e.target.value)} label={"Tên sảnh"} placeholder={"Tên sảnh"} style={{width: "100%"}} />        
                </ListItem>      
                <ListItem style={{width: 400, margin: "16px 0"}} disablePadding>
                    <TimePicker.RangePicker format={"HH:mm:ss"} value={time} onCalendarChange={(e)=> setTime(e)} className={"time-picker-range"} style={{height: 56, width: "100%"}} />
                </ListItem>
                <ListItem style={{width: 400, margin: "16px 0"}} disablePadding>
                    <TextField value={serviceGuest} onChange={(e)=> setServiceGuest(e.target.value)} label={"Số khách phục vụ"} placeholder={"Số khách phục vụ"} style={{width: "100%"}} />        
                </ListItem>      
                <ListItem style={{width: 400, margin: "16px 0"}} disablePadding>
                    <TextField value={price} onChange={(e)=> setPrice(e.target.value)} label={"Giá sảnh"} placeholder={"Giá sảnh"} style={{width: "100%"}} />        
                </ListItem>      
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button type={"ghost"} onClick={handleClose}>Hủy</Button>
          <Button type={"primary"} onClick={async ()=> {
            if(banquetHallName.trim().length <= 0) {
              return swal("Thông báo", "Tên sảnh không được để trống", "error" )
            }
            if(parseInt(price) < 0 || typeof parseInt(price) !== "number") {
              return swal("Thông báo", "Giá sảnh không hợp lệ, Vui lòng thử lại", "error" )
            }
            const result= await add_banquet(banquetHallName, time[0].format("HH:mm:ss"), time[1].format("HH:mm:ss"), parseInt(serviceGuest), price)
            if(parseInt(result?.status)=== 200) {
              props?.setChange(prev=> !prev)
              enqueueSnackbar({
                message: result?.message,
                variant: 'success',
              });
              setBanquetHallName("")
              setTime([])
              setServiceGuest()
            }
            else {
              enqueueSnackbar({
                message: result?.message,
                variant: 'error',
              });
            }
            handleClose()
          }}>Tạo</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}