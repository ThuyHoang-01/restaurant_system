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
  Checkbox,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
// import update_user from "../../../../api/admin/update_user";
import { Button } from "antd";
import UploadImage from "../../../UploadImage/UploadImage";
import get_list_dish from "../../../../api/admin/get_list_dish";
// import update_menu from "../../../../api/menu/update_menu";
import add_menu from "../../../../api/menu/add_menu";
import upload_image from "../../../../api/upload_image";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddMenu(props) {
  const [open, setOpen] = React.useState(false);
  // eslint-disable-next-line
  const [id, setId] = React.useState(props?.id);
  const [menuName, setMenuName] = React.useState("");
  const [menuDescription, setMenuDescription] = React.useState("");
  const [image, setImage] = React.useState();
  const [listDishChoose, setListDishChoose] = React.useState([]);
  const [listDish, setListDish] = React.useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListDishChoose(typeof value === "string" ? value.split(",") : value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    (async () => {
      const result = await get_list_dish();
      return setListDish(result);
    })();
  }, []);
  return (
    <div>
      <button onClick={handleClickOpen} className="userListEdit">
        Thêm menu
      </button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Thêm menu</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              style={{ width: 350 }}
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
              placeholder={"Tên menu"}
            />
            {menuName.length <=0 && <div style={{marginTop: 6, color: "#f00", padding: 16}}>Tên menu không được để trống</div>}

            <div></div>
            <br />
            <div></div>
            <TextField
              style={{ width: 350 }}
              value={menuDescription}
              onChange={(e) => setMenuDescription(e.target.value)}
              placeholder={"Mô tả"}
            />
            {menuDescription.length <=0 && <div style={{marginTop: 6, color: "#f00", padding: 16}}>Mô tả menu không được để trống</div>}
            
            <div></div>
            <br />
            <div></div>
            <UploadImage title={"Ảnh menu"} setImage={setImage} />
            <div></div>
            <br />
            <div></div>
            <Select
              onChange={handleChange}
              value={listDishChoose}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              name="categoryId"
              fullWidth
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <span>Món ăn trong menu</span>;
                }

                return selected?.map((item) => item?.dish_name + ",");
              }}
              multiple
            >
              {listDish?.map((item) => (
                <MenuItem value={item} key={item.dish_name}>
                  {/* {item.dish_name} */}
                  <Checkbox
                    checked={
                      listDishChoose
                        .map((item) => item?.dish_name)
                        .indexOf(item.dish_name) > -1
                    }
                  />
                  <ListItemText primary={item.dish_name} />
                </MenuItem>
              ))}
            </Select>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            type={"primary"}
            onClick={async () => {
              const finalImage = await upload_image(image?.thumbUrl);
              const result = await add_menu(
                menuName,
                menuDescription,
                finalImage,
                id,
                listDishChoose
              );
              if (result?.add === true) {
                swal("Thông báo", "Đã tạo thành công", "success").then(() => {
                  handleClose();
                  setMenuName("");
                  setMenuDescription("");
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
