import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
// #1 import quill-image-uploader
import ImageUploader from "quill-image-uploader";
import { TextField } from "@mui/material";
import UploadImage from "../../../UploadImage/UploadImage";
import { Button } from "antd";
import upload_image from "../../../../api/upload_image";
import swal from "sweetalert";
import add_blog from "../../../../api/add_blog";
import { createBrowserHistory } from "history";

// #2 register module
Quill.register("modules/imageUploader", ImageUploader);

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      title: "",
      image: undefined,
    };
  }
  handleContentChange = (value) => {
    this.setState({ text: value });
  };
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
            />
            <br />
            <Button
              type={"primary"}
              onClick={async () => {
                const history = createBrowserHistory();

                const imageFinal = await upload_image(
                  this.state.image?.thumbUrl
                );

                const result = await add_blog(
                  this.state.text,
                  imageFinal?.img,
                  this.state.title
                );
                if (result?.add === true) {
                  swal("Thông báo", "Tạo thành công", "success")
                  .then(()=> history.go(-1))
                } else {
                  swal("Thông báo", "Lỗi không xác định", "error");
                }
              }}
              variant={"contained"}
              style={{ marginTop: 16 }}
            >
              Tạo
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

export default News;
