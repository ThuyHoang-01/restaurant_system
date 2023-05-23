import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import get_detail_dish from "../../api/get_detail_dish";
import { Image } from "antd";
import { Box } from "@mui/material";
import numberWithCommas from "../util/numberThousandSeparator";
import swal from "sweetalert";
import { AppContext } from "../../App";
import Swal from "sweetalert2";
import book_dish from "../../api/book/book_dish";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />; //sử dụng component `Transition` trong ứng dụng, 
//có thể truy cập các thuộc tính và phương thức của `Slide` thông qua `ref`, để thao tác và tương tác với `Slide`.
});

export default function DetailDish(props) { 
  const { auth, user, setOrderId, orderId } = React.useContext(AppContext);
  //auth`, `user` là các giá trị được lưu trong `AppContext` đề cập tới trạng thái xác thực và thông tin của người dùng.
  // setOrderId`, `orderId` là hai biến được sử dụng với mục đích thiết lập và lưu lại Id của đơn hàng.
  // / `useContext`, React sẽ tự động quản lý việc "subscribe" và "unsubscribe" khi các giá trị trong context 

  const [data, setData] = React.useState(); //
  //  React state `data` và `setData` để lưu trữ dữ liệu được trả về từ API.
  React.useEffect(() => {
    (async () => {
      const result = await get_detail_dish(props?.dishId); // t` để thực hiện lấy dữ liệu từ `get_detail_dish()` API thông qua `async/await`
      return setData(result)
    })();
  }, [props?.dishId, props?.open]);

  const handleClose = () => {
    props?.setOpen(false);
  };
  // code trên thực hiện việc lấy thông tin chi tiết của món ăn ngay 
  //khi component được render, hiển thị nó trên giao diện và cho phép đóng modal
  // khi người dùng ấn vào nút đóng.

  return (
    <div>
      <Dialog
        open={props?.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{data?.dish_name}</DialogTitle> {/*  DialogTitle hiển thị tên của món ăn*/}
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description"> {/*DialogContentText hiển thị mô tả và giá của món ăn*/}
            <Image src={data?.image_dish} style={{width: 450, aspectRatio: 3 / 2, objectFit: "cover", zIndex: 99999}} />
            <Box>
                <div style={{margin: "10px 0"}}>Mô tả: {data?.dish_description}</div>
                <div style={{margin: "10px 0"}}>Giá: <span style={{color: "red"}}>{numberWithCommas(parseInt(data?.dish_price))}đ</span></div> {/* hiển thị giá , nhập số nguyên + , + đ */}

            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Đóng</Button>
          <Button onClick={async () => {
                    handleClose()
                      const { value: text } = await Swal.fire({
                        input: 'text',
                        inputLabel: "Số lương",
                        inputPlaceholder: "Nhập số lượng món cần đặt",
                        inputAttributes: {
                          'aria-label': 'Type your message here'
                        },  
                        showCancelButton: true,
                      });

                      if (text) {
                        console.log(text)
                        if(typeof parseInt(text) !== "number") {
                          return swal("Thông báo", "Số lượng không hợp lệ, vui lòng kiểm tra lại", "error")
                        }
                        if (auth === true) {
                            try {
                              const result = await book_dish(
                                props?.dishId, parseInt(text), orderId // get api trar veef 
                              ) 
                              if(result?.status=== 200) {
                                swal("Thông báo", "Đặt món thành công", "success")
                              }
                              else {
                                swal("Thông báo", "Lỗi không xác định", "error") // swal alert that bai
                              }
                            }
                            catch(e) {
                              swal("Thông báo", "Lỗi không xác định", "error")
                            }
                          }
                          else {
                            swal("Thông báo", "Bạn cần đăng nhập để tiếp tục", "error")

                          }
                      }
                      else {
                        swal("Thông báo", "Bạn cần nhập số lượng món cần đặt", "error")
                      }
                    }}>Đặt món</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
