import { useParams } from "react-router-dom";
import CouponService from "./../../services/coupon.service";
import { useEffect, useState } from "react";
import SmallLoading from "./../../components/Loading/SmallLoading";
import SystemAlert from "./../../components/Alert/Alert";
import { DateUtil } from "../../utils/date.util";

function CouponDetailPage() {
  const { id } = useParams();
  const [coupon, setCoupon] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleUpdateCoupon = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await CouponService.updateCoupon({ id, coupon });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const getCurrentCoupon = async () => {
    try {
      setLoading(true);
      const res = await CouponService.getCouponById(id);
      setCoupon(res);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentCoupon();
  }, [id]);

  const handleCodeChange = (e) => {
    setCoupon({ ...coupon, code: e.target.value.trim() });
  };

  const handleTypeChange = (e) => {
    setCoupon({ ...coupon, type: e.target.value });
  };

  const handleDiscountAmountChange = (e) => {
    setCoupon({ ...coupon, discount_amount: e.target.value });
  };

  const handleMinPurchaseChange = (e) => {
    setCoupon({ ...coupon, minimum_purchase_amount: e.target.value });
  };

  const handleMaxUsageChange = (e) => {
    setCoupon({ ...coupon, max_usage_count: e.target.value });
  };

  const handleEffectAtChange = (e) => {
    setCoupon({ ...coupon, effect_at: e.target.value });
  };

  const handleExpireAtChange = (e) => {
    setCoupon({ ...coupon, expire_at: e.target.value });
  };

  const handleStatusChange = (e) => {
    setCoupon({ ...coupon, status: e.target.value });
  };

  return (
    <>
      {loading && <SmallLoading />}
      {error && <SystemAlert type={"error"} message={error} />}
      {coupon && (
        <>
          <div
            className="coupon-detail p-4"
            style={{ backgroundColor: "white", borderRadius: 20 }}
          >
            <div className="coupon-detail_form col-sm-12 col-md-7 col-xl-5">
              <form onSubmit={handleUpdateCoupon}>
                <div className="form-group m-3">
                  <label>Mã code:</label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    value={coupon.code}
                    onChange={handleCodeChange}
                  />
                </div>
                <div className="form-group m-3">
                  <label>Loại giảm giá:</label>
                  <select
                    required
                    className="form-control"
                    value={coupon.type}
                    onChange={handleTypeChange}
                  >
                    <option value="percent">Giảm theo phần trăm</option>
                    <option value="fixed">Giảm theo số tiền</option>
                  </select>
                </div>
                <div className="form-group m-3">
                  <label>Giá trị giảm giá:</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    value={coupon.discount_amount}
                    onChange={handleDiscountAmountChange}
                  />
                </div>
                <div className="form-group m-3">
                  <label>Giá tối thiểu khi mua:</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    value={coupon.minimum_purchase_amount}
                    onChange={handleMinPurchaseChange}
                  />
                </div>
                <div className="form-group m-3">
                  <label>Số lần sử dụng tối đa:</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    value={coupon.max_usage_count}
                    onChange={handleMaxUsageChange}
                  />
                </div>
                <div className="form-group m-3">
                  <label>Bắt đầu từ:</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    required
                    value={DateUtil.toDate(coupon.effect_at)}
                    onChange={handleEffectAtChange}
                  />
                </div>
                <div className="form-group m-3">
                  <label>Hết hạn vào:</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    required
                    value={DateUtil.toDate(coupon.expire_at)}
                    onChange={handleExpireAtChange}
                  />
                </div>
                <div className="form-group m-3">
                  <label>Trạng thái:</label>
                  <select
                    className="form-control"
                    required
                    value={coupon.status}
                    onChange={handleStatusChange}
                  >
                    <option
                      value="1"
                      style={{ color: "green", fontWeight: "500" }}
                    >
                      Đang sử dụng
                    </option>
                    <option
                      value="0"
                      style={{ color: "#FE5000", fontWeight: "500" }}
                    >
                      Ngưng sử dụng
                    </option>
                  </select>
                </div>
                <div className="form-group m-3">
                  <button className="btn btn-success">Cập nhật</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CouponDetailPage;
