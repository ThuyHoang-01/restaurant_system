import { DeleteOutline } from "@material-ui/icons";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import swal from "sweetalert";
import get_list_contact from "../../../../api/staff/get_list_contact";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import delete_contact from "../../../../api/admin/delete_contact";
import moment from "moment";

const Contact = () => {
  const [data, setData]= useState([])
  const [change, setChange]= useState(false)
  const navigate= useNavigate()
  useEffect(()=> {
    (async ()=> {
      const result= await get_list_contact()
      return setData(result)
    })()
  }, [change])
  const columns = [
    { field: "id", headerName: "ID", width: 350, flex: 1 },
    {
      field: "username",
      headerName: "Họ tên khách hàng",
      width: 200, flex: 1
    },
    { field: "phone", headerName: "Số điện thoại", width: 150, flex: 1 },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      flex: 1,
    },
    {
      field: "guest",
      headerName: "Số lượng khách yêu cầu",
      width: 200,
      flex: 1,
    },
    {
      field: "time_created",
      headerName: "Đã gửi lúc",
      width: 200,
      flex: 1,
      renderCell: (params)=> {
        return <>{moment(params.row.time_created).format("DD/MM/YYYY HH:mm:ss")}</>
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 500,
      flex: 3,
      renderCell: (params) => {
        return (
          <>
            <Button type={"primary"} onClick={()=> {
              navigate("/staff/payment", {state: {request_booking_id: params.row.request_booking, is_open_new_order: true, user: {...params.row} }})
            }}>Tạo đơn hàng (Yêu cầu sẽ được xóa khi đơn hàng được tạo)</Button>
            <DeleteOutline
              className="userListDelete"
              onClick={() => {
                swal(
                  "Thông báo",
                  "Bạn có muốn xóa yêu cầu của khách hàng này không",
                  {
                    buttons: {
                      delete: "Delete",
                      cancel: "Cancel",
                    },
                  }
                ).then(async (value) => {
                  if (value === "delete") {
                    try {
                      const result= await delete_contact(params.row.id)
                      if(result.delete=== true ) {
                        swal("Thông báo", "Đã xóa yêu cầu này thành công", "success")
                        .then(()=> setChange(prev=> !prev))
                      }
                    }
                    catch(error) {
                      swal("Thông báo", "Lỗi", "error")
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
    }
  ];
  return (
    <div className={"payment-item-2"} style={{ padding: 10, width: "100%" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Alert severity="info">Danh sách sẽ được làm mới mỗi ngày.</Alert>
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

export default Contact;
