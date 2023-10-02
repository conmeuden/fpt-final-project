import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import "./style.css";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Editor from "./../CKEditor/Editor";
import SmallLoading from "./../Loading/SmallLoading";
import SystemAlert from "./../Alert/Alert";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

function CreateProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [propertiesName, setPropertiesName] = useState("");
  const [images, setImages] = useState([]);

  const [properties, setProperties] = useState({});
  const [variantList, setVariantList] = useState([]);

  const [propertiesEdit, setPropertiesEdit] = useState(false);

  const isImage = (file) => file.type.startsWith("image/");

  const handleImageUpload = (event) => {
    setError(false);
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      return;
    }
    if (!isImage(selectedFile)) {
      setError("Vui lòng chỉ chọn file ảnh.");
      return;
    }
    if (images.length >= 6) {
      setError("Chỉ được tối đa 6 hình ảnh.");
      return;
    }
    try {
      setLoading(true);

      setImages((prevImages) => [...prevImages, selectedFile]);

      setLoading(false);
    } catch (error) {
      setError("Đã xảy ra lỗi khi tải ảnh.");
      setLoading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handlePropertiesEditChange = () => {
    setPropertiesEdit(!propertiesEdit);
  };

  const handleAddProperty = (e) => {
    e.preventDefault();

    const numberOfProperties = Object.keys(properties).length;

    if (numberOfProperties < 2 && propertiesName) {
      setProperties({ ...properties, [propertiesName]: [] });
      setPropertiesName("");
    } else {
      console.error("Cannot add more than 2 properties.");
    }
  };

  const handleAddPropertyValue = (e, key) => {
    e.preventDefault();

    const inputValue = e.target.propertyValue.value;

    if (inputValue.trim() !== "") {
      setProperties((prevProperties) => ({
        ...prevProperties,
        [key]: [...prevProperties[key], inputValue],
      }));

      e.target.propertyValue.value = "";
    }
  };

  const handleDeletePropertyValue = (key, index) => {
    setProperties((prevProperties) => {
      const updatedProperties = { ...prevProperties };
      updatedProperties[key] = updatedProperties[key].filter(
        (_, i) => i !== index
      );
      return updatedProperties;
    });
  };

  const handleDeleteProperty = (key) => {
    setProperties((prevProperties) => {
      const updatedProperties = { ...prevProperties };
      delete updatedProperties[key];
      return updatedProperties;
    });
  };

  console.log(properties);

  const handleAddVariant = () => {
    // Create an empty variant with properties initialized to an empty object
    const newVariant = {
      properties: {},
      gia: 0, // You can set the default values for gia and tonKho
      tonKho: 0,
    };

    // Add the new variant to the variantList
    setVariantList((prevVariantList) => [...prevVariantList, newVariant]);
  };
  return (
    <>
      {loading && <SmallLoading />}
      {error && <SystemAlert type={"error"} message={error} />}
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
                      <img
                        src={URL.createObjectURL(item)}
                        alt=""
                        className="img-fluid"
                      />
                      <span
                        className="btn-remove-image"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <RemoveCircleIcon />
                      </span>
                    </div>
                  ))}

                {images && images.length < 6 ? (
                  <div className="col-md-12 mt-2">
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                    >
                      {`Tải ảnh (${images.length}/6)`}
                      <VisuallyHiddenInput
                        accept="image/*"
                        type="file"
                        onChange={handleImageUpload}
                      />
                    </Button>
                  </div>
                ) : (
                  ""
                )}
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
                type="number"
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
                type="number"
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
                type="number"
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
                type="number"
                id="productStockQuantity"
                placeholder="Nhập số lượng tồn kho của sản phẩm..."
                className="form-control"
              />
            </div>
          </div>
          <hr className="hr m-3" />
          <div className="form-group m-3 row">
            <label className="col-form-label col-md-3">Thêm phân loại:</label>
            <div className="col-md-9">
              {propertiesEdit ? (
                <div className="create-properties">
                  <div className="create-properties-form">
                    <div className="product-properties">
                      {properties && Object.keys(properties).length < 2 && (
                        <form onSubmit={handleAddProperty}>
                          <div className="row">
                            <div className="col-5">
                              <input
                                className="form-control"
                                type="text"
                                placeholder="VD: màu, size, dung lượng,..."
                                value={propertiesName}
                                onChange={(e) => {
                                  setPropertiesName(e.target.value);
                                }}
                              />
                            </div>
                            <div className="col-4">
                              <button className="btn btn-primary" type="submit">
                                Thêm thuộc tính
                              </button>{" "}
                              <button
                                className="btn btn-danger"
                                type="button"
                                onClick={handlePropertiesEditChange}
                              >
                                Hủy phân loại
                              </button>
                            </div>
                          </div>
                        </form>
                      )}

                      {!properties ||
                        (Object.keys(properties).length === 2 && (
                          <button
                            className="btn btn-danger"
                            type="button"
                            onClick={handlePropertiesEditChange}
                          >
                            Hủy phân loại
                          </button>
                        ))}
                      {properties && Object.keys(properties).length > 0 && (
                        <div className="product-properties-container mt-4">
                          {properties &&
                            Object.keys(properties) &&
                            Object.keys(properties).map((item, index) => {
                              return (
                                <form
                                  key={index}
                                  onSubmit={(e) => {
                                    handleAddPropertyValue(e, item);
                                  }}
                                >
                                  <div className="form-group m-3 row">
                                    <div className="col-3">
                                      <TextField
                                        label={`Thêm "${item}"`}
                                        variant="outlined"
                                        inputProps={{ name: "propertyValue" }}
                                      />
                                    </div>
                                    <div className="col-8">
                                      <Paper
                                        sx={{
                                          display: "flex",
                                          justifyContent: "center",
                                          flexWrap: "wrap",
                                          listStyle: "none",
                                          p: 0.5,
                                          m: 0,
                                        }}
                                        component="ul"
                                      >
                                        {properties[item].map((data, index) => {
                                          return (
                                            <ListItem key={index}>
                                              <Chip
                                                label={data}
                                                onDelete={() =>
                                                  handleDeletePropertyValue(
                                                    item,
                                                    index
                                                  )
                                                }
                                              />
                                            </ListItem>
                                          );
                                        })}
                                      </Paper>
                                    </div>
                                    <div className="col-1">
                                      <button
                                        className="btn"
                                        style={{ color: "red" }}
                                        onClick={() =>
                                          handleDeleteProperty(item)
                                        }
                                        type="button"
                                      >
                                        <DeleteIcon />
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="product-add-properties-btn"
                  onClick={handlePropertiesEditChange}
                >
                  <div style={{ marginTop: 20 }}>
                    <LibraryAddIcon />
                    Tạo phân loại cho sản phẩm
                  </div>
                </div>
              )}
            </div>
          </div>
          {propertiesEdit && (
            <>
              <hr className="hr m-3" />
              <div className="form-group m-3 row">
                <label className="col-form-label col-md-3">
                  Thêm biến thể:
                </label>
                <div className="col-md-9">
                  <div className="product-variant">
                    <button
                      className="btn btn-primary"
                      onClick={handleAddVariant}
                    >
                      <ControlPointIcon /> Thêm biến thể
                    </button>
                  </div>

                  <div className="product-variant_list mt-3">
                    {variantList.map((variant, variantIndex) => (
                      <div
                        className="product-variant_list_item p-3"
                        key={variantIndex}
                      >
                        <div className="row">
                          {Object.keys(properties).map((property, index) => (
                            <div className="form-group col-3" key={index}>
                              <FormControl fullWidth>
                                <InputLabel>{property}</InputLabel>
                                <Select
                                  label={property}
                                  value={variant.properties[property] || ""}
                                  onChange={(e) => {
                                    const updatedVariants = [...variantList];
                                    updatedVariants[variantIndex].properties[
                                      property
                                    ] = e.target.value;
                                    setVariantList(updatedVariants);
                                  }}
                                >
                                  {properties[property].map(
                                    (value, valueIndex) => (
                                      <MenuItem key={valueIndex} value={value}>
                                        {value}
                                      </MenuItem>
                                    )
                                  )}
                                </Select>
                              </FormControl>
                            </div>
                          ))}
                          <div className="form-group col-3">
                            <TextField
                              label="Giá"
                              variant="outlined"
                              type="number"
                              value={variant.gia}
                              onChange={(e) => {
                                const updatedVariants = [...variantList];
                                updatedVariants[variantIndex].gia =
                                  e.target.value;
                                setVariantList(updatedVariants);
                              }}
                            />
                          </div>
                          <div className="form-group col-2">
                            <TextField
                              label="Tồn kho"
                              variant="outlined"
                              type="number"
                              value={variant.tonKho}
                              onChange={(e) => {
                                const updatedVariants = [...variantList];
                                updatedVariants[variantIndex].tonKho =
                                  e.target.value;
                                setVariantList(updatedVariants);
                              }}
                            />
                          </div>
                          <div className="form-group col-1">
                            <button
                              className="btn"
                              style={{ color: "red" }}
                              onClick={() => {
                                const updatedVariants = [...variantList];
                                updatedVariants.splice(variantIndex, 1);
                                setVariantList(updatedVariants);
                              }}
                              type="button"
                            >
                              <DeleteIcon />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          <hr className="hr m-3" />
          <div className="form-group m-3 row">
            <span className="col-md-3"></span>
            <button className="btn btn-success m-3 col-md-2">
              Tạo sản phẩm
            </button>
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
