import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { MenuItem, TextField } from '@mui/material';
import update_info_user from '../../../../api/update_info_user';
import swal from 'sweetalert';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function InfoAdmin(props) {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail]= React.useState(props?.email)
  const [firstName, setFirstName]= React.useState(props?.firstName)
  const [lastName, setLastName]= React.useState(props?.lastName)
  const [isUpdate, setIsUpdate]= React.useState(true)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <MenuItem onClick={()=> {
              handleClickOpen()
            }}>Thông tin cá nhân
        </MenuItem>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Thông tin cá nhân"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div>Tài khoản</div>
            <TextField autoFocus={true} disabled={isUpdate} style={{marginTop: 8, width: 400}} value={email} onChange={(e)=> setEmail(e.target.value)} />
            <div></div>
            <div>Họ</div>
            <div></div>
            <div></div>
            <TextField disabled={isUpdate} style={{marginTop: 8, width: 400}} value={firstName} onChange={(e)=> setFirstName(e.target.value)} />
            <div></div>
            <div>Tên</div>
            <div></div>
            <TextField disabled={isUpdate} style={{marginTop: 8, width: 400}} value={lastName} onChange={(e)=> setLastName(e.target.value)} />
            <div></div>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> {
            setIsUpdate(()=> true)
            handleClose()
          }}>Đóng</Button>
          {
            isUpdate=== true && 
            <Button variant={"contained"} onClick={async ()=> {
                setIsUpdate(()=> false)
            }}>Cập nhật</Button>
          }
          {
            isUpdate=== false && 
            <Button variant={"contained"} onClick={async ()=> {
                setIsUpdate(()=> true)
                try {

                    const result= await update_info_user(firstName, lastName, email)
                    if(result?.update=== true) {
                        swal("Thông báo", "Cập nhật thông tin thành công", "success")
                        .then(()=> handleClose())
                    }
                    else {
                        swal("Thông báo", "Cập nhật thông tin thất bại", "error")
                    }
                }
                catch(e) {
                    console.log(e)
                    swal("Thông báo", "Lỗi xuất hiện", "error")
                }
            }}>Xác nhận</Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}
