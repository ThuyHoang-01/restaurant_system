import React, { useState, useEffect } from "react";
import get_menu from "../../../../api/menu/get_menu";
import UpdateMenu from "./UpdateMenu";
import { DeleteOutline } from "@material-ui/icons";
import swal from "sweetalert";
import { DataGrid } from "@material-ui/data-grid";
import AddMenu from "./AddMenu";
import delete_menu from "../../../../api/menu/delete_menu";
import { Image } from "antd";
import Fuse from "fuse.js"
import { SearchBar } from "../dish/DishAdmin";

const MenuAdmin = () => {
  const [data, setData] = useState([]);
  const [change, setChange]= useState(false)
  const [search, setSearch]= useState("")
  const [dataSearch, setDataSearch]= useState([])

  const options = {
    includeScore: true,
    keys: [
      "menu_name",
    ]
  };
  const fuse = new Fuse(data, options);
  function searchByLabel(searchTerm) {
    // Filter the data to only include items with matching labels

    const results = data?.filter(item => item?.menu_name?.toLowerCase()?.includes(searchTerm?.toLowerCase()));
    return results;
  }
  const handleSearch= (e)=> {
    setSearch(e.target.value)
    setDataSearch(searchByLabel(e.target.value))
    if(e.target.value?.length <= 0) {
      setDataSearch(data)
    }
  }
  useEffect(() => {
    (async () => {
      const result = await get_menu();
      setDataSearch(result)
      return setData(result);
    })();
  }, [change]);
  const handleDelete= (id)=> {
    setData(data?.filter(item=> item?.id !== id))
  }
  const columns = [
    { field: "id", headerName: "ID", width: 200, flex: 1 },
    {
      field: "menu_name",
      headerName: "Tên menu",
      width: 200,
      flex: 1
    },
    { field: "menu_description", headerName: "Mô tả", width: 250, flex: 1 },
    {
      field: "menu_photo",
      headerName: "Hình ảnh menu",
      width: 200,
      flex: 1,
      renderCell: (params)=> {
        return (
          <Image src={params.row?.menu_photo} alt="" />
        )
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <UpdateMenu {...params.row}  setChange={setChange} />
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
                    await delete_menu(params.row?.id);
                    handleDelete(params.row.id);
                    swal("Thông báo", "Xóa menu thành công", "success")
                    .then(()=> setChange(!change))
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
  ];
  return <div className={"home"} style={{ padding: 20 }}>
    <AddMenu setChange={setChange} />
    <br />
    <SearchBar search={search} handleSearch={handleSearch} />
    <br />
    <div className="userList" style={{height: 500}}>
      <DataGrid
        rows={dataSearch}
        disableSelectionOnClick
        columns={columns}
        pageSize={5}
        pagination={true}
        paginationMode="client"
      />
    </div>

  </div>;
};

export default MenuAdmin;
