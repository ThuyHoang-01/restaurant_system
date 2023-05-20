import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
// import AddIcon from '@mui/icons-material/Add';
// import { TextField } from '@mui/material';
import swal from "sweetalert";
import { TextField } from "@mui/material";
import { Button } from "antd";
// import update_menu from "../../../../api/menu/update_menu";
import update_staff from "../../../../api/admin/update_staff";
import validateEmail from "../../../util/validateEmail";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateStaff(props) {
  const [open, setOpen] = React.useState(false);
  // eslint-disable-next-line
  const [id, setId] = React.useState(props?.id);
  const [firstName, setFirstName] = React.useState(props?.first_name);
  const [lastName, setLastName] = React.useState(props?.last_name);
  const [email, setEmail] = React.useState(props?.email);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button onClick={handleClickOpen} className="userListEdit">
        Edit
      </button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Sửa nhân viên</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              style={{ width: 350 }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={"Họ"}
            />
            <div></div>
            <br />
            <div></div>
            <TextField
              style={{ width: 350 }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={"Tên"}
            />
            <div></div>
            <br />
            <div></div>
            <TextField
              style={{ width: 350 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={"Email"}
            />
            <div></div>
            <br />
            <div></div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            type={"primary"}
            onClick={async () => {
              if(firstName?.length <=0 ) {
                return swal("Thông báo", "Họ nhân viên không được để trống", "error")
              }
              if(lastName?.length <= 0) {
                return swal("Thông báo", "Tên nhân viên không được để trống", "error")

              }
              if(validateEmail(email) === false) {
                return swal("Thông báo", "Email sai định dạng", "error")
              }
              const result = await update_staff(firstName, lastName, email, id);
              if (result?.update === true) {
                swal("Thông báo", "Cập nhật thành công", "success").then(() => {
                  handleClose();
                  setFirstName("");
                  setLastName("");
                  setEmail("");
                  props?.setChange((prev) => !prev);
                });
              } else {
                swal("Thông báo", "Lỗi không xác định", "error");
              }
            }}
          >
            Lưu
          </Button>
          <Button type={"default"} onClick={handleClose}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
