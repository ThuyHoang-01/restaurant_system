import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import get_banquet from "../../../../api/banquet/get_banquet";
import AddBanquet from "./AddBanquet";
import UpdateBanquet from "./UpdateBanquet";
import swal from "sweetalert";
import { DeleteOutline } from "@material-ui/icons";
import delete_banquet from "../../../../api/banquet/delete_banquet";

const BanquetHallAdmin = () => {
  const [change, setChange]= useState(false)
  const [data, setData]= useState([])
  useEffect(()=> {
    (async ()=> {
        const result= await get_banquet()
        return setData(result)
    })()
  }, [change])
  const columns = [
    { field: "id", headerName: "ID", width: 120, flex: 1 },
    {
        field: "banquet_hall_name",
        headerName: "Tên sảnh",
        width: 200,
        flex: 1
      },
    {
      field: "id_user_booking",
      headerName: "Tên người dùng đặt",
      width: 200,
      flex: 1,
      renderCell: (params)=> {
        if(params.row?.id_user_booking.length <= 0 || !params.row.id_user_booking) {
          return <>
            Chưa có người đặt
          </>
        }
        else {
          return `${(params.row?.first_name)} ${(params.row?.last_name)}`
        }
      }

    },
    {
      field: "time_start",
      headerName: "Thời gian mở",
      width: 150,
      flex: 1
    },
    {
      field: "time_end",
      headerName: "Thời gian đóng",
      width: 150,
      flex: 1
    },
    {
      field: "price",
      headerName: "Giá sảnh",
      width: 150,
      flex: 1,
      renderCell: (params)=> {
        return params.row.price + "VND"
      }
    },
    {
      field: "is_locked",
      headerName: "Đã khóa sảnh",
      flex: 1,
      renderCell: (params)=> {
        if(parseInt(params.row?.is_locked)=== 0) {
          return <>
            Đang mở
          </>
        }
        else {
          return <>
            Đã khóa
          </>
        }
      },
      width: 160,
   
    },
    {
        field: "service_guest",
        headerName: "Số khách phục vụ",
        width: 100,
        flex: 1
      },
      {
          field: "action",
          headerName: "Action",
          width: 300,
          flex: 1,
          renderCell: (params) => {
              return (
                  <div style={{gap: 10, display: "flex", alignItems: "center"}}>
                      <UpdateBanquet {...params.row} id={params.row.id} setChange={setChange} />
                      {/* <DeleteCategory id={params.row.id} setChange={setChange} /> */}
                      <DeleteOutline
                        className="userListDelete"
                        onClick={() => {
                          swal("Thông báo", "Bạn có muốn xóa menu này không", {
                            buttons: {
                              delete: "Delete",
                              cancel: "Cancel",
                            },
                          }).then(async (value) => {
                            if (value === "delete") {
                              await delete_banquet(params.row?.id);
                              swal("Thông báo", "Bạn đã xóa sảnh tiệc này thành công", "success")
                              .then(()=> setChange(!change))
                              
                            } else {
                              return null;
                            }
                          });
                        }}
                      />
                  </div>
              );
          },
      },
  ];
  return <div className={"home"} style={{padding: 20}}>
    {/* <Box sx={{display: "flex"}}></Box> */}
    <div style={{margin: "16px 0"}}>
        <AddBanquet setChange={setChange} />
    </div>
    <DataGrid
      style={{background: "#fff"}}
        rows={data}
        disableSelectionOnClick
        columns={columns}
        // checkboxSelection
        getRowHeight={() => 'auto'}
        pageSize={5}
        pagination={true}
        paginationMode="client"
      />
  </div>;
};

export default BanquetHallAdmin;
