import React, { useState, useEffect } from "react";
import NewOrderPayment from "./NewOrderPayment";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import swal from "sweetalert";
import get_list_order_request from "../../../../api/user/get_list_order_request";
import Alert from '@mui/material/Alert';
import EditPayment from "./EditPayment";
import { Button } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Bill, { renderFinalValue } from "./Bill";
import confirm_payment from "../../../../api/staff/confirm_payment";
import { useContext } from "react";
import { AppContext } from "../../../../App";
import bill from "../../../../api/bill";
// import numberWithCommas from "../../../util/numberThousandSeparator";
import _ from "lodash";
import delete_order_request from "../../../../api/order/delete_order_request";

const Payment = () => {
  const {setIsOrderOnlyMenu }= useContext(AppContext)
  const [data, setData] = useState([]);
  const [change, setChange]= useState(false);
  const [totalBill, setTotalBill]= useState(0)
  const navigate= useNavigate()
  const fetchData= async () => {
    const result = await get_list_order_request();
    return setData(result);
  }
  useEffect(() => {
    fetchData()
    const interval = setInterval(() => {
      fetchData()
    }, 5000);

    return clearInterval(interval)
  }, [change]);
  const columns = [
    { field: "id", headerName: "ID", width: 350,flex: 1 },
    {
      field: "user_name",
      headerName: "Họ tên khách hàng",
      width: 200,
      flex: 1
    },
    { field: "phone", headerName: "Số điện thoại", width: 150, flex: 1 },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      flex: 1
    },
    {
        field: "deposit",
        headerName: "Đặt cọc",
        width: 300,
        flex: 2,
        renderCell: (params)=> {
            if(params.row.paid=== 1) {
              return (
                <div>Đã đặt cọc. Đã thanh toán</div>
              )
            }
            if(params.row.deposit=== 1) {
                return <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
                  Đã đặt cọc <Button onClick={()=> {
                    swal("Bạn muốn đặt gì ?", {buttons: {
                      ok1: "Đặt sảnh",
                      ok2: "Đặt bàn",
                      cancel: "Hủy"
                    }})
                    .then(value=> {
                      if(value=== "ok1") {
                        setIsOrderOnlyMenu(()=> false)
                        navigate("/banquet-hall", {state: {order_id: params?.row?.id, is_order_by_staff: true, is_order_banquet_hall: true}})
                      }
                      else if(value=== "ok2") {
                        setIsOrderOnlyMenu(()=> true)
                        navigate("/menu", {state: {order_id: params?.row?.id, is_order_by_staff: true, is_order_only_menu: true}})
                      }
                      else {
                        return null
                      }
                    })
                  }} type={"link"}>Tiến hành đặt</Button>
                </div>
            }
            else {
                return "Chưa đặt cọc"
            }
        }
      },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      flex: 2,
      renderCell: (params) => {
        return (
          <>
            <EditPayment {...params.row} setChange={setChange} />
            <Bill {...params.row} setTotalBill={setTotalBill} />
            <DeleteOutline
              className="userListDelete"
              onClick={() => {
                swal(
                  "Thông báo",
                  "Bạn có muốn xóa yểu cầu của khách hàng này không",
                  {
                    buttons: {
                      delete: "Delete",
                      cancel: "Cancel",
                    },
                  }
                ).then(async (value) => {
                  if (value === "delete") {
                    try {
                      const result= await delete_order_request(params.row.id)
                      if(result?.delete=== true) {
                        swal("Thông báo", "Đã xóa thành công", "success")
                        .then(()=> setChange(prev=> !prev))
                      }
                      else {
                        swal("Thông báo", "Xóa thất bại", "error")
                      }
                    }catch(e) {
                      console.log(e)
                      swal("Thông báo", "Lỗi không xuất hiện", "error")
                    }

                    // await delete_user(params.row?.id)
                    // handleDelete(params.row.id)
                  } else {
                    return null;
                  }
                });
              }}
            />
          </>
        );
      },
    },
    {
      field: "paid",
      headerName: "Thanh toán",
      width: 200,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {params.row?.paid=== 1 && <Button type={"primary"} disabled={true}>Đã thanh toán</Button>}
            {params.row?.paid=== 0 && <Button onClick={()=> {
              swal("Thông báo", "Bạn đã chắc khách hàng này đã thanh toán ?", {buttons: {
                ok: "Xác nhận",
                cancel: "Hủy"
              }})
              .then(async value=> {
                if(value=== "ok") {
                  const result1 = await bill.getBill(params.row?.order_request_id);
                  const listBanquet= result1?.filter(item=> item?.banquet_hall_id?.length > 0)
                  const total= (_.sumBy(result1, (row)=> parseInt(
                            parseInt(
                              renderFinalValue(
                                row?.amount_menu,
                                row?.amount_dish,
                                row?.id_user_booking
                              )
                            ) *
                              parseInt(
                                renderFinalValue(
                                  row?.price,
                                  row?.menu_price,
                                  row?.dish_price
                                )
                              )
                          )))
                  const result= await confirm_payment(params?.row?.id, total, listBanquet)
                  if(result?.paid=== true ){
                    swal("Thông báo", "Bạn đã xác nhận thành công", "success")
                    .then(()=> setChange(prev=> !prev))
                  }
                  else {
                    swal("Thông báo", "Có lỗi xảy ra", "error")
                  }
                }
              })
            }} type={"primary"}>Xác nhận đã thanh toán</Button>}
          </>
        );
      },
    },
    {
      field: "time_created",
      headerName: "Đã tạo",
      width: 200,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {moment(params.row?.time_created).format("DD-MM-YYYY HH:mm:ss")}
          </>
        );
      },
    },
  ];
  return (
    <div className={"payment-item-2"} style={{ padding: 10, width: "100%" }}>
      <br />
      <br />
      <br />
      <br />
      <NewOrderPayment setChange={setChange} />
      <br />
      <Alert severity="error">Danh sách sẽ xóa đi những đơn hàng trong trạng thái chưa đặt cọc trong vòng 1 giờ.</Alert>
      <br />
      <Alert severity="info">Danh sách đơn hàng sẽ được làm mới mỗi ngày.</Alert>
      <br />
      <div style={{ width: "100%", height: 500 }}>
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={5}
          pagination={true}
          paginationMode="client"
        />
      </div>
    </div>
  );
};

export default Payment;
