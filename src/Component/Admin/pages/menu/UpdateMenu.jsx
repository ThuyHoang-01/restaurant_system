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
import { Checkbox, ListItemText, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { Button } from "antd";
import update_menu from "../../../../api/menu/update_menu";
import UploadImage from "../../../UploadImage/UploadImage";
import upload_image from "../../../../api/upload_image";
import get_list_dish from "../../../../api/admin/get_list_dish";

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
  const [listDishChoose, setListDishChoose] = React.useState([]);
  const [listDish, setListDish] = React.useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setListDishChoose(typeof value === "string" ? value.split(",") : value);
  };
  React.useEffect(()=> {
    setId(props?.id)
    setMenuName(props?.menu_name)
    setImage(props?.menu_photo)
    setMenuDescription(props?.menu_description)
  }, [props])
  React.useEffect(()=> {
    if((props?.listDish)) {
      setListDishChoose(JSON.parse(props?.listDish))
    }
    else {
      setListDishChoose([])
    }
  }, [props?.listDish])
  React.useEffect(() => {
    (async () => {
      const result = await get_list_dish();
      return setListDish(result?.filter(item=> parseInt(item.mode)=== 0));
    })();
  }, []);

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
              if(image?.thumbUrl) {
                const imageFinal= await upload_image(image?.thumbUrl)
                console.log(listDish)
                const result = await update_menu(menuName, menuDescription, imageFinal?.img, id, listDishChoose);
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
                const result = await update_menu(menuName, menuDescription, image, id, listDishChoose);
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
