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
import UploadImage from "../../../UploadImage/UploadImage";
// import get_list_dish from "../../../../api/admin/get_list_dish";
// import add_menu from "../../../../api/menu/add_menu";
import upload_image from "../../../../api/upload_image";
import add_dish from "../../../../api/dish/add_dish";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddDish(props) {
  const [open, setOpen] = React.useState(false);
  // eslint-disable-next-line
  const [dishName, setDishName] = React.useState("");
  const [dishDescription, setDishDescription] = React.useState("");
  const [dishPrice, setDishPrice] = React.useState("");
  const [image, setImage] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button onClick={handleClickOpen} className="userListEdit">
        Thêm món ăn
      </button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Thêm món ăn</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              style={{ width: 350 }}
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              placeholder={"Tên món ăn"}
            />
            {dishName.length <=0 && <div style={{marginTop: 6, color: "#f00", padding: 16}}>Tên món ăn không được để trống</div>}
            <div></div>
            <br />
            <div></div>
            <TextField
              style={{ width: 350 }}
              value={dishDescription}
              onChange={(e) => setDishDescription(e.target.value)}
              placeholder={"Mô tả"}
            />
            {dishDescription.length <=0 && <div style={{marginTop: 6, color: "#f00", padding: 16}}>Mô tả món ăn không được để trống</div>}
            <div></div>
            <br />
            <div></div>
            <TextField
              style={{ width: 350 }}
              value={dishPrice}
              onChange={(e) => setDishPrice(e.target.value)}
              placeholder={"Gía"}
            />
            {dishPrice.length <=0 && <div style={{marginTop: 6, color: "#f00", padding: 16}}>Giá món ăn không được để trống</div>}
            <div></div>
            <br />
            <div></div>
            <UploadImage title={"Ảnh món ăn"} setImage={setImage} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            type={"primary"}
            onClick={async () => {
              if(dishName.length <= 0) {
                return swal("Thông báo", "Tên món ăn không được để trống", "error")
              }
              if(dishDescription.length <= 0) {
                return swal("Thông báo", "Mô tả món ăn không được để trống", "error")
              }
              if(dishPrice.length <= 0) {
                return swal("Thông báo", "Giá món ăn không được để trống", "error")
              }
              const finalImage = await upload_image(image?.thumbUrl);
              const result = await add_dish(
                dishName,
                dishDescription,
                dishPrice,
                finalImage?.img
              );
              if (result?.add === true) {
                swal("Thông báo", "Tạo thành công", "success").then(() => {
                  handleClose();
                  setDishName("");
                  setDishDescription("");
                  setDishPrice(0);
                  props?.setChange((prev) => !prev);
                });
              } else {
                swal("Thông báo", "Lỗi", "error");
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
