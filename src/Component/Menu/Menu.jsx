import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import get_list_dish from "../../api/menu/get_list_dish";
import Header from "../Header/Header";
// import ReactPaginate from "react-paginate";
import { Image, Typography } from "antd";
import numberWithCommas from "../util/numberThousandSeparator";
import SearchItemMenu from "./Search";
import { Button } from "antd";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import swal from "sweetalert";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import book_dish from "../../api/book/book_dish";
import Swal from "sweetalert2";
import { AppContext } from "../../App";
const { Title } = Typography;

const Menu = () => {
  const { auth, user, setOrderId, orderId } = useContext(AppContext); //`useContext` sẽ lấy ra các giá trị đã được cung cấp bởi `AppContext`, bao gồm các giá trị `auth`, `user`, `setOrderId`, `orderId`.
  const {category_id }= useParams() //sẽ lấy ra các parameters trong URL.
  const [data, setData] = useState([]); //sẽ khởi tạo một state để quản lý dữ liệu trạng thái cho component.
  useEffect(() => { //sẽ được sử dụng để gọi hàm lấy danh sách món ăn, 
    //được cung cấp bởi hàm `get_list_dish(category_id)`, lần đầu tiên khi component được hiển thị hoặc thay đổi giá trị `category_id`.

    (async () => {
      const result = await get_list_dish(category_id);
      return setData(result);
    })();
  }, [category_id]);
  
  const location= useLocation() // lấy ra thông tin hiện tại của trang
  const navigate = useNavigate(); // chuyển hướng đến các URL khác trong ứng dụng
  const [itemOffset, setItemOffset] = useState(0);//itemOffset` chứa số thứ tự của item đầu tiên được hiển thị trên trang.
  const endOffset = itemOffset + 8; // 8 món mỗi trang
  // eslint-disable-next-line
  const currentItems = data.slice(itemOffset, endOffset); //hiển thị danh sách các món ăn ứng với vị trí mới.
  // eslint-disable-next-line
  const pageCount = Math.ceil(data.length / 8); 
  // eslint-disable-next-line
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 8) % data.length; //lấy số thứ tự của trang được chọn * số lượng phần tử trên một trang.Sau đó, kết quả này sẽ được lấy phần dư với số lượng phần tử trong danh sách `data` để đảm bảo vị trí offset không vượt quá giới hạn của danh sách
    setItemOffset(newOffset);
  };
  useEffect(()=> {
    if(location.state?.order_id) {
      setOrderId(location.state?.order_id) //cập nhật `setOrderId` khi giá trị `location.state?.order_id` thay đổi. `location
    }
  }, [location.state])
      useEffect(()=> {
  })
  //`order_id` truyền vào ko phải null và undefined, `setOrderId` sẽ được sử dụng để cập nhật giá trị `orderId` mới.

  return (
    <>
      <Header />
      <Box sx={{ padding: 1 }}>
        <Grid container padding={2}>
          <SearchItemMenu data={data} />
        </Grid>
        <Grid container width={"100%"} spacing={2} padding={2}>
          {data?.map((item, key) => (
            <Grid key={key} item xs={4}>
              <Box
                style={{
                  width: "100%",
                  padding: 10,
                  background: "#fff",
                  borderRadius: 10,
                }}
              >
                <Image
                  width={"100%"}
                  style={{
                    borderRadius: 10,
                    aspectRatio: 1 / 1,
                    objectFit: "cover",
                  }}
                  src={item?.image_dish}
                />
                <Box
                  sx={{
                    width: "100%",
                    flexDirection: "row",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Title level={4}>{item?.dish_name}</Title> 
                  {/* hiển thị tiêu đề với kích cỡ khác nhau trong ứng dụng. */}
                  <Title level={4} style={{ color: "red" }}>
                    {numberWithCommas(item?.dish_price)}đ 
                    {/* hien thi giá món ăn , theo định dạng dấu phẩy và đ */}
                  </Title>
                </Box>
                {
                  user?.role=== 2 && 
                  <Button
                    onClick={async () => {
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
                                item?.dish_id, parseInt(text), orderId
                              ) 
                              if(result?.status=== 200) {
                                swal("Thông báo", "Đặt món thành công", "success")
                              }
                              else {
                                swal("Thông báo", "Lỗi không xác định", "error")
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
                    }}
                    icon={<ShoppingCartIcon />}
                    type={"primary"}
                    style={{
                      fontSize: 18,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 16,
                    }}
                  >
                    Đặt món
                  </Button>
                }
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        /> */}
      </Box>
    </>
  );
};

export default Menu;
