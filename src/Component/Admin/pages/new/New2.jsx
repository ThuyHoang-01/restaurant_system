import React, { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, TextField } from "@mui/material";
import swal from "sweetalert";
import upload_image from "../../../../api/upload_image";
import { Route, Routes, useNavigate } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import moment from "moment";
import "react-quill/dist/quill.snow.css";
import { createBrowserHistory } from "history";
// #1 import quill-image-uploader
import ImageUploader from "quill-image-uploader";
import News from "./New";
import detail_new from "../../../../api/detail_new";
import edit_blog from "../../../../api/edit_blog";
import UploadImage from "../../../UploadImage/UploadImage";
import get_list_blog from "../../../../api/get_list_blog";
import delete_blog from "../../../../api/delete_blog";

// import get_detail_blog from "../../../../api/admin/get_detail_blog";
// import edit_blog from "../../../../api/blog/edit_blog";
// #2 register module
Quill.register("modules/imageUploader", ImageUploader);

export default function NewsAdmin() {
  return (
    <Routes>
      <Route path={"/"} element={<ListBlog></ListBlog>} />
      <Route path={"/add"} element={<News />} />
      <Route path={"/edit/:newsId"} element={<EditBlog />} />
    </Routes>
  );
}

const ListBlog = () => {
  const navigate = useNavigate();
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "content",
      headerName: "Content",
      width: 200,
    },
    {
      field: "title",
      headerName: "Title",
      width: 200,
    },
    {
      field: "image",
      headerName: "Image",
      width: 200,
      renderCell: (params) => {
        return <img src={params.row?.image} alt="" />;
      },
    },
    {
      field: "time_created",
      headerName: "Time created",
      width: 200,
      renderCell: (params) => {
        return (
          <>{moment(params.rows?.time_created).format("DD-MM-YYYY HH:mm:ss")}</>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div style={{ gap: 10, display: "flex", alignItems: "center" }}>
            <>
              <Button
                onClick={() => navigate("/admin/news/edit/" + params.row.id)}
                type={"primary"}
                variant={"contained"}
              >
                Edit blog
              </Button>
              <Button
                onClick={() => {
                  swal("Thông báo", "Bạn có muốn xóa bài viết này không ?", {
                    buttons: {
                      delete: "Delete",
                      cancel: "Cancel",
                    },
                  }).then(async (value) => {
                    if (value === "delete") {
                      await delete_blog(params.row?.id);
                      handleDelete(params.row.id);
                      swal("Thông báo", "Đã xóa bài viết thành công", "success");
                      setChange((prev) => !prev);
                    } else {
                      return null;
                    }
                  });
                }}
                variant={"contained"}
                color={"error"}
              >
                Delete
              </Button>
            </>
            <></>
          </div>
        );
      },
    },
  ];
  const [data, setData] = useState([]);
  const [change, setChange] = useState(false);
  useEffect(() => {
    (async () => {
      const result = await get_list_blog();
      return setData(result);
    })();
  }, [change]);

  return (
    <div className={"userList"}>
      <Button
        onClick={() => navigate("/admin/news/add")}
        variant={"contained"}
        style={{ marginBottom: 12 }}
      >
        Add new blog
      </Button>
      <div style={{ height: 500 }}>
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

// class CreateBlog extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       text: "",
//       title: "",
//       image: undefined,
//     };
//   }
//   handleClick = () => {
//     const history = createBrowserHistory();
//     history.goBack();
//   };
//   handleContentChange = (value) => {
//     this.setState({ text: value });
//   };
//   modules = {
//     // #3 Add "image" to the toolbar
//     toolbar: [["bold", "italic", "image"]],
//     // # 4 Add module and upload function
//     imageUploader: {
//       upload: (file) => {
//         return new Promise((resolve, reject) => {
//           const formData = new FormData();
//           formData.append("image", file);

//           fetch(
//             "https://api.imgbb.com/1/upload?key=d36eb6591370ae7f9089d85875e56b22",
//             {
//               method: "POST",
//               body: formData,
//             }
//           )
//             .then((response) => response.json())
//             .then((result) => {
//               console.log(result);
//               resolve(
//                 "https://gd2.alicdn.com/imgextra/i3/2023922414/TB2EFu1X_cCL1FjSZFPXXXZgpXa_!!2023922414.jpg_400x400.jpg"
//               );
//             })
//             .catch((error) => {
//               reject("Upload failed");
//               console.error("Error:", error);
//             });
//         });
//       },
//     },
//   };

//   formats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "list",
//     "bullet",
//     "indent",
//     "link",
//     "image",
//     "imageBlot", // #5 Optinal if using custom formats
//   ];
//   setImage = (e) => {
//     this.setState({ image: e });
//   };
//   render() {
//     return (
//       <div className={"userList"}>
//         <div
//           style={{
//             width: "100%",
//             display: "flex",
//             justifyContent: "space-between",
//             gap: 10,
//           }}
//         >
//           <div style={{ flex: "1 1 0" }}>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 10,
//                 marginBottom: 12,
//               }}
//             >
//               <span style={{ fontSize: 18 }}>Title:</span>{" "}
//               <TextField
//                 value={this.state.title}
//                 onChange={(e) => this.setState({ title: e.target.value })}
//                 label={"title"}
//               />
//             </div>
//             <UploadImage
//               title={"Ảnh tin tức khuyến mãi"}
//               setImage={this.setImage}
//             />

//             <div></div>
//             <br />
//             <ReactQuill
//               onChange={this.handleContentChange}
//               theme="snow"
//               modules={this.modules}
//               formats={this.formats}
//             />
//             <br />
//             <Button
//               type={"primary"}
//               onClick={async () => {
//                 const imageFinal = await upload_image(
//                   this.state.image?.thumbUrl
//                 );

//                 const result = await add_blog(
//                   this.state.text,
//                   imageFinal?.img,
//                   this.state.title
//                 );
//                 if (result?.add === true) {
//                   swal("Thông báo", "Create is successfully", "success").then(() =>
//                     this.handleClick()
//                   );
//                 } else {
//                   swal("Thông báo", "Error", "error");
//                 }
//               }}
//               variant={"contained"}
//               style={{ marginTop: 16 }}
//             >
//               Create
//             </Button>
//           </div>
//           <div className="preview" style={{ flex: "1 1 0" }}>
//             <h2 style={{ textAlign: "center" }}>Xem trước</h2>
//             <div dangerouslySetInnerHTML={{ __html: this.state.text }} />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

class EditBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      title: "",
      image: undefined,
    };
  }
  handleClick = () => {
    const history = createBrowserHistory();
    history.go(-1);
  };
  handleContentChange = (value) => {
    this.setState({ text: value });
  };
  componentDidMount() {
    (async () => {
      const result = await detail_new(window.location.href.split("/")[6]);
      this.setState({
        text: result.content,
        title: result.title,
        image: result.image,
      });
    })();
  }
  modules = {
    // #3 Add "image" to the toolbar
    toolbar: [["bold", "italic", "image"]],
    // # 4 Add module and upload function
    imageUploader: {
      upload: (file) => {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("image", file);

          fetch(
            "https://api.imgbb.com/1/upload?key=d36eb6591370ae7f9089d85875e56b22",
            {
              method: "POST",
              body: formData,
            }
          )
            .then((response) => response.json())
            .then((result) => {
              console.log(result);
              resolve(
                "https://gd2.alicdn.com/imgextra/i3/2023922414/TB2EFu1X_cCL1FjSZFPXXXZgpXa_!!2023922414.jpg_400x400.jpg"
              );
            })
            .catch((error) => {
              reject("Upload failed");
              console.error("Error:", error);
            });
        });
      },
    },
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "imageBlot", // #5 Optinal if using custom formats
  ];
  setImage = (e) => {
    this.setState({ image: e });
  };
  render() {
    return (
      <div className={"userList"}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <div style={{ flex: "1 1 0" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 12,
              }}
            >
              <span style={{ fontSize: 18 }}>Title:</span>{" "}
              <TextField
                value={this.state.title}
                onChange={(e) => this.setState({ title: e.target.value })}
                label={"title"}
              />
            </div>
            <UploadImage
              title={"Ảnh tin tức khuyến mãi"}
              setImage={this.setImage}
            />

            <div></div>
            <br />
            <ReactQuill
              onChange={this.handleContentChange}
              theme="snow"
              modules={this.modules}
              formats={this.formats}
              value={this.state.text}
            />
            <br />
            <Button
              type={"primary"}
              onClick={async () => {
                if (this.state.image?.thumbUrl) {
                  const imageFinal = await upload_image(
                    this.state.image?.thumbUrl
                  );
                  const result = await edit_blog(
                    this.state.text,
                    imageFinal?.img,
                    this.state.title,
                    window.location.href.split("/")[6]
                  );
                  if (result?.update === true) {
                    swal("Thông báo", "Cập nhật thành công", "success").then(
                      () => this.handleClick()
                    );
                  } else {
                    swal("Thông báo", "Lỗi", "error");
                  }
                } else {
                  const result = await edit_blog(
                    this.state.text,
                    this.state.image,
                    this.state.title,
                    window.location.href.split("/")[6]
                  );
                  if (result?.update === true) {
                    swal("Thông báo", "Update is successfully", "success").then(
                      () => this.handleClick()
                    );
                  } else {
                    swal("Thông báo", "Lỗi", "error");
                  }
                }
              }}
              variant={"contained"}
              style={{ marginTop: 16 }}
            >
              Update
            </Button>
          </div>
          <div className="preview" style={{ flex: "1 1 0" }}>
            <h2 style={{ textAlign: "center" }}>Xem trước</h2>
            <div dangerouslySetInnerHTML={{ __html: this.state.text }} />
          </div>
        </div>
      </div>
    );
  }
}
