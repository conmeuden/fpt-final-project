import CouponService from "./../../services/coupon.service";
import { useState } from "react";
import SmallLoading from "./../../components/Loading/SmallLoading";
import SystemAlert from "./../../components/Alert/Alert";
import { DateUtil } from "../../utils/date.util";

function CreateCouponPage() {
  const [coupon, setCoupon] = useState({
    code: "",
    type: "percent",
    effect_at: new Date(),
    expire_at: new Date(),
    discount_amount: 0,
    minimum_purchase_amount: 0,
    max_usage_count: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Function to handle form submission
  const handleCreateCoupon = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!coupon.code.trim()) {
      setError("Mã code không được để trống");
      return;
    }

    if (!coupon.discount_amount || coupon.discount_amount <= 0) {
      setError("Giá trị giảm giá phải lớn hơn 0");
      return;
    }

    if (!coupon.minimum_purchase_amount || coupon.minimum_purchase_amount < 0) {
      setError("Giá tối thiểu khi mua không hợp lệ");
      return;
    }

    if (!coupon.max_usage_count || coupon.max_usage_count < 0) {
      setError("Số lần sử dụng tối đa không hợp lệ");
      return;
    }

    if (new Date(coupon.effect_at) > new Date(coupon.expire_at)) {
      setError("Thời gian bắt đầu phải trước thời gian kết thúc");
      return;
    }

    try {
      // If all validations pass, proceed with API call
      setLoading(true);
      await CouponService.createCoupon(coupon);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Function to handle changes in the "code" input
  const handleCodeChange = (e) => {
    setError(false); // Clear any previous errors
    setCoupon({ ...coupon, code: e.target.value.trim() });
  };

  // Function to handle changes in the "type" dropdown
  const handleTypeChange = (e) => {
    setCoupon({ ...coupon, type: e.target.value });
  };

  // Function to handle changes in the "discount_amount" input
  const handleDiscountAmountChange = (e) => {
    setError(false);
    setCoupon({ ...coupon, discount_amount: e.target.value });
  };

  // Function to handle changes in the "minimum_purchase_amount" input
  const handleMinPurchaseChange = (e) => {
    setError(false);
    setCoupon({ ...coupon, minimum_purchase_amount: e.target.value });
  };

  // Function to handle changes in the "max_usage_count" input
  const handleMaxUsageChange = (e) => {
    setError(false);
    setCoupon({ ...coupon, max_usage_count: e.target.value });
  };

  // Function to handle changes in the "effect_at" input
  const handleEffectAtChange = (e) => {
    setError(false);
    setCoupon({ ...coupon, effect_at: e.target.value });
  };

  // Function to handle changes in the "expire_at" input
  const handleExpireAtChange = (e) => {
    setError(false);
    setCoupon({ ...coupon, expire_at: e.target.value });
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
            <div className="coupon-detail_form col-4">
              <form onSubmit={handleCreateCoupon}>
                <div className="form-group m-3">
                  <label>Mã code:</label>
                  <input
                    required
                    type="text"
                    placeholder="Nhập mã giảm giá..."
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
                  <button className="btn btn-success">Tạo mã</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CreateCouponPage;
