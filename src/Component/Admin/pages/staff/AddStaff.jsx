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
import {
  // Checkbox,
  // ListItemText,
  // MenuItem,
  // OutlinedInput,
  // Select,
  TextField,
} from "@mui/material";
import { Button } from "antd";
// import UploadImage from "../../../UploadImage/UploadImage";
// import get_list_dish from "../../../../api/admin/get_list_dish";
// import add_menu from "../../../../api/menu/add_menu";
// import upload_image from "../../../../api/upload_image";
// import add_dish from "../../../../api/dish/add_dish";
import add_staff from "../../../../api/admin/add_staff";
import validateEmail from "../../../util/validateEmail";
import { validatePassword } from "../../../util/validatePassword";
import { isValidEmail, isValidMobile } from "../../../Home/AboutUs/AboutUs";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddStaff(props) {
  const [open, setOpen] = React.useState(false);
  // eslint-disable-next-line
  const [firstName, setFirstName]= React.useState("")
  const [lastName, setLastName]= React.useState("")
  const [email, setEmail]= React.useState("")
  const [phone, setPhone]= React.useState("")
  const [password, setPassword]= React.useState("")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button onClick={handleClickOpen} className="userListEdit">
        Thêm nhân viên
      </button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Thêm nhân viên</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              style={{ width: 350 }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={"Họ"}
            />
            {firstName.length <=0 && <div style={{marginTop: 6, color: "#f00", padding: 16}}>Họ nhân viên không được để trống</div>}

            <div></div>
            <br />
            <div></div>
            <TextField
              style={{ width: 350 }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={"Tên"}
            />
            {lastName.length <=0 && <div style={{marginTop: 6, color: "#f00", padding: 16}}>Tên nhân viên không được để trống</div>}

            <div></div>
            <br />
            <div></div>
            <TextField
              style={{ width: 350 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={"Email"}
            />
            {isValidEmail(email)=== false && <div style={{marginTop: 6, color: "#f00", padding: 16}}>Email nhân viên không được để trống</div>}

            <div></div>
            <br />
            <div></div>
            <TextField
              style={{ width: 350 }}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={"Sô điện thoại"}
            />
            {isValidMobile(phone)=== false && <div style={{marginTop: 6, color: "#f00", padding: 16}}>Số điện thoại nhân viên không được để trống</div>}

            <div></div>
            <br />
            <div></div>
            <TextField
            type={"password"}
              style={{ width: 350 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={"Mật khẩu"}
            />
            {validatePassword(password)=== false && <div style={{marginTop: 6, color: "#f00", padding: 16}}>Mật khẩu nhân viên quá yếu</div>}
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
              if(validatePassword(password)=== false) {
                return swal("Thông báo", "Mật khẩu quá yếu, mật khẩu phải gồm ít nhất 8 ký tự gồm chữ số, chữ hoa, chữ thường", "error")

              }
              if(isValidMobile(phone)=== false) {
                return swal("Thông báo", "Số điện thoại không hợp lệ, thử lại", "error")

              }
              // const finalImage = await upload_image(image?.thumbUrl);
              const result = await add_staff(
                firstName,
                lastName,
                email,
                phone,
                password
              );
              if (result?.add === true) {
                swal("Thông báo", "Đã tạo thành công", "success").then(() => {
                  handleClose();
                  setFirstName("")
                  setLastName("")
                  setPhone("")
                  props?.setChange((prev) => !prev);
                });
              } else {
                swal("Thông báo", "Lỗi không xác định", "error");
              }
            }}
          >
            Tạo
          </Button>
          <Button type={"default"} onClick={handleClose}>
            Hủy
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
