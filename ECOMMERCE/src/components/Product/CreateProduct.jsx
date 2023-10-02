import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import UploadService from "./../../services/upload.service";
import "./style.css";
import BackspaceIcon from "@mui/icons-material/Backspace";
import Editor from "./../CKEditor/Editor";

function CreateProduct() {
  const [images, setImages] = useState([]);

  const handleImageUpload = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile || images.length >= 6) {
      return;
    }
    try {
      const filePath = await UploadService.singleFile({ file: selectedFile });
      setImages((prevImages) => [...prevImages, filePath]);
    } catch (error) {
      console.error("Error handling file upload:", error);
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <>
      <div
        className="create-product p-4"
        style={{ backgroundColor: "white", borderRadius: 20 }}
      >
        <div className="create-product_form col-10">
          <div className="form-group m-3 row">
            <label className="col-form-label col-md-3">Hình ảnh:</label>

            <div className="create-product_images mb-2 col-md-9">
              <div className="row">
                {images &&
                  images.map((item, index) => (
                    <div className="col-2 p-0" key={index}>
                      <img src={item} alt="" className="img-fluid" />
                      <span
                        className="btn-remove-image"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <BackspaceIcon />
                      </span>
                    </div>
                  ))}

                <div className="col-md-12 mt-2">
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                  >
                    {`Tải ảnh (${images.length}/6)`}
                    <VisuallyHiddenInput
                      type="file"
                      onChange={handleImageUpload}
                    />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group m-3 row">
            <label className="col-form-label col-md-3" htmlFor="productName">
              Tên sản phẩm:
            </label>
            <div className="col-md-9">
              <input
                type="text"
                id="productName"
                placeholder="Nhập tên của sản phẩm..."
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group m-3 row">
            <label
              className="col-form-label col-md-3"
              htmlFor="productCategory"
            >
              Ngành hàng:
            </label>
            <div className="col-md-9">
              <input
                type="text"
                id="productCategory"
                placeholder="Nhập ngành hàng của sản phẩm..."
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group m-3 row">
            <label
              className="col-form-label col-md-3"
              htmlFor="productCategory"
            >
              Danh mục sản phẩm:
            </label>
            <div className="col-md-9">
              <input
                type="text"
                id="productCategory"
                placeholder="Nhập danh mục của sản phẩm..."
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group m-3 row">
            <label
              className="col-form-label col-md-3"
              htmlFor="productDescription"
            >
              Mô tả:
            </label>
            <div className="col-md-9">
              <Editor />
            </div>
          </div>

          <div className="form-group m-3 row">
            <label
              className="col-form-label col-md-3"
              htmlFor="productSeoKeywords"
            >
              Từ khóa SEO:
            </label>
            <div className="col-md-9">
              <textarea
                rows="3"
                id="productSeoKeywords"
                className="form-control"
                placeholder="Nhập từ khóa SEO của sản phẩm..."
              ></textarea>
            </div>
          </div>

          <hr className="hr m-3" />

          <div className="form-group m-3 row">
            <label
              className="col-form-label col-md-3"
              htmlFor="productImportPrice"
            >
              Giá nhập hàng:
            </label>
            <div className="col-md-9">
              <input
                type="text"
                id="productImportPrice"
                placeholder="Nhập giá nhập hàng của sản phẩm..."
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group m-3 row">
            <label
              className="col-form-label col-md-3"
              htmlFor="productDefaultPrice"
            >
              Giá bán mặc định:
            </label>
            <div className="col-md-9">
              <input
                type="text"
                id="productDefaultPrice"
                placeholder="Nhập giá bán mặc định của sản phẩm..."
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group m-3 row">
            <label
              className="col-form-label col-md-3"
              htmlFor="productSalePrice"
            >
              Giá sale:
            </label>
            <div className="col-md-9">
              <input
                type="text"
                id="productSalePrice"
                placeholder="Nhập giá sale của sản phẩm..."
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group m-3 row">
            <label
              className="col-form-label col-md-3"
              htmlFor="productStockQuantity"
            >
              Số lượng tồn kho:
            </label>
            <div className="col-md-9">
              <input
                type="text"
                id="productStockQuantity"
                placeholder="Nhập số lượng tồn kho của sản phẩm..."
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateProduct;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
