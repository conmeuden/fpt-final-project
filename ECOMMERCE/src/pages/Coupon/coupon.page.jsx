import { useEffect, useState } from "react";
import { getAllCoupons } from "./../../redux/slices/coupon.slice";
import { useDispatch, useSelector } from "react-redux";
import SystemAlert from "../../components/Alert/Alert";
import SmallLoading from "../../components/Loading/SmallLoading";
import CouponTable from "./CouponTable";
import { Link } from "react-router-dom";

function CouponPage() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.coupon);
  const [keyword, setKeyword] = useState("");
  const [couponParams, setCouponParams] = useState({
    page: 1,
    limit: 10,
    keyword: "",
    status: "",
  });

  const handleSetPage = (e) => {
    setCouponParams({ ...couponParams, page: Number(e) });
  };
  const handleStatusChange = (e) => {
    setCouponParams({ ...couponParams, status: e.target.value });
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllCoupons(couponParams));
  }, [couponParams, dispatch]);

  return (
    <>
      {error && <SystemAlert type={"error"} message={error} />}
      <div className="coupon-page">
        <div className="coupon-control">
          <div className="row">
            <div className="form-group col-4">
              <input
                type="text"
                placeholder="Tìm kiếm theo mã code..."
                className="form-control"
                onChange={handleSearchChange}
              />
            </div>
            <div className="form-group col-4">
              <select className="form-control" onChange={handleStatusChange}>
                <option value="">Chọn trạng thái</option>
                <option value="1">Đang sử dụng</option>
                <option value="0">Ngưng sử dụng</option>
              </select>
            </div>
            <div className="form-group col-4">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setCouponParams({ ...couponParams, keyword });
                }}
              >
                Tìm kiếm
              </button>{" "}
              <Link to={"/management/coupons/create"}>
                <button className="btn btn-success">Thêm mới</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="coupon-table mt-2">
          {loading ? (
            <SmallLoading />
          ) : (
            <> {data && <CouponTable data={data} setPage={handleSetPage} />}</>
          )}
        </div>
      </div>
    </>
  );
}

export default CouponPage;
