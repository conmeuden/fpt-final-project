import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SmallLoading from "../Loading/SmallLoading";
import { getAllProducts } from "./../../redux/slices/product.slice";
import SystemAlert from "./../Alert/Alert";
import ProductTable from "./ProductTable";
import { getAllCategories } from "../../redux/slices/category.slice";
import Slider from "@mui/material/Slider";
import { Link } from "react-router-dom";

function valueLabelFormat(value) {
  return `${value.toLocaleString()}đ`;
}

function Product() {
  const dispatch = useDispatch();
  const [productParams, setProductParams] = useState({
    page: 1,
    limit: 10,
    keyword: "",
    status: "",
    min_price: 500,
    max_price: 10000000,
    category_id: "",
    barcode: "",
  });

  const [categoryParams] = useState({
    page: 1,
    limit: 999999,
    status: 1,
  });

  const { data, loading, error } = useSelector((state) => state.product);
  const listCategories = useSelector((state) => state.category.data);

  const initData = () => {
    dispatch(getAllCategories(categoryParams));
    dispatch(getAllProducts(productParams));
  };

  useEffect(() => {
    initData();
  }, [dispatch, productParams.page, productParams.status]);

  const handleSearch = () => {
    dispatch(getAllProducts(productParams));
  };

  const handleChangeSlider = (event, newValue) => {
    setProductParams((prevParams) => ({
      ...prevParams,
      min_price: Number(newValue[0]),
      max_price: Number(newValue[1]),
    }));
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setProductParams((prevParams) => ({
      ...prevParams,
      category_id: selectedCategoryId,
    }));
  };

  const handleChangeKeyword = (e) => {
    setProductParams((prevParams) => ({
      ...prevParams,
      keyword: e.target.value,
    }));
  };
  const handleChangeBarcode = (e) => {
    setProductParams((prevParams) => ({
      ...prevParams,
      barcode: e.target.value,
    }));
  };
  const handleChangeStatus = (e) => {
    setProductParams((prevParams) => ({
      ...prevParams,
      status: e.target.value,
    }));
  };

  const handleSetPage = (e) => {
    setProductParams({ ...productParams, page: Number(e) });
  };

  return (
    <>
      {error && <SystemAlert type={"error"} message={error} />}
      <div className="product-page">
        <div className="product-control">
          <div className="row">
            <div className="form-group mt-2 col-4">
              <input
                value={productParams.keyword}
                onChange={handleChangeKeyword}
                type="text"
                className="form-control"
                placeholder="Tìm kiếm sản phẩm..."
              />
            </div>
            <div className="form-group mt-2 col-4">
              <input
                value={productParams.barcode}
                onChange={handleChangeBarcode}
                type="text"
                className="form-control"
                placeholder="Quét mã vạch..."
              />
            </div>
            <div className="form-group mt-2 col-4">
              <Slider
                min={500}
                step={500}
                max={10000000}
                getAriaLabel={() => "Temperature range"}
                value={[
                  Number(productParams.min_price),
                  Number(productParams.max_price),
                ]}
                onChange={handleChangeSlider}
                valueLabelDisplay="on"
                getAriaValueText={valueLabelFormat}
                valueLabelFormat={valueLabelFormat}
              />
            </div>
            <div className="form-group mt-2 col-4">
              <select
                className="form-control"
                value={productParams.category_id}
                onChange={handleCategoryChange}
              >
                <option value="">Chọn danh mục</option>
                {listCategories?.categories?.rows &&
                  listCategories.categories.rows.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group mt-2 col-4">
              <select
                className="form-control"
                value={productParams.status}
                onChange={handleChangeStatus}
              >
                <option value="">Chọn trạng thái</option>
                <option value="1">Đang sử dụng</option>
                <option value="0">Ngưng sử dụng</option>
              </select>
            </div>
            <div className="form-group mt-2 col-4">
              <button className="btn btn-primary" onClick={handleSearch}>
                Tìm kiếm
              </button>{" "}
              <Link to={"/management/products/create"}>
                <button className="btn btn-success">Thêm mới</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="product-table mt-3">
          {loading ? (
            <SmallLoading />
          ) : (
            <> {data && <ProductTable data={data} setPage={handleSetPage} />}</>
          )}
        </div>
      </div>
    </>
  );
}

export default Product;
