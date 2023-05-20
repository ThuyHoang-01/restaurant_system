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
import update_menu from "../../../../api/menu/update_menu";
import UploadImage from "../../../UploadImage/UploadImage";
import upload_image from "../../../../api/upload_image";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateMenu(props) {
  const [open, setOpen] = React.useState(false);
  // eslint-disable-next-line
  const [id, setId] = React.useState(props?.id);
  const [menuName, setMenuName] = React.useState(props?.menu_name);
  const [image, setImage]= React.useState(props?.menu_photo)
  const [menuDescription, setMenuDescription] = React.useState(
    props?.menu_description
  );

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
        <DialogTitle>Sửa menu</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              style={{ width: 350 }}
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
              placeholder={"Tên menu"}
            />
            <div></div>
            <br />
            <div></div>
            <TextField
              style={{ width: 350 }}
              value={menuDescription}
              onChange={(e) => setMenuDescription(e.target.value)}
              placeholder={"Mô tả"}
            />
            <div></div>
            <br />
            <div></div>
            <UploadImage title={"Ảnh menu"} setImage={setImage} />
            <div></div>
            <br />
            <div></div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            type={"primary"}
            onClick={async () => {
              if(image?.thumbUrl) {
                const imageFinal= await upload_image(image?.thumbUrl)
                const result = await update_menu(menuName, menuDescription, imageFinal?.img, id);
                if (result?.update === true) {
                  swal("Thông báo", "Cập nhật thành công", "success").then(() => {
                    handleClose();
                    setMenuName("");
                    setMenuDescription("");
                    props?.setChange((prev) => !prev);
                  });

                } else {
                  swal("Thông báo", "Lỗi không xác định", "error");
                }
              }
              else {
                const result = await update_menu(menuName, menuDescription, image, id);
                if (result?.update === true) {
                  swal("Thông báo", "Cập nhật thành công", "success").then(() => {
                    handleClose();
                    setMenuName("");
                    setMenuDescription("");
                    props?.setChange((prev) => !prev);
                  });

                } else {
                  swal("Thông báo", "Lỗi không xác định", "error");
                }
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
