import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ShopsService from "./../../services/shops.service";
import SystemAlert from "./../../components/Alert/Alert";
import SmallLoading from "./../../components/Loading/SmallLoading";

function ShopDetail() {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCurrentShop = async () => {
    try {
      setLoading(true);
      const data = await ShopsService.getShopById(id);
      setShop(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      await ShopsService.updateShop({
        id,
        shop,
      });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShop((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await ShopsService.removeShop(id);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (
      !shop.name ||
      !shop.user_id ||
      !shop.package_id ||
      !shop.logo ||
      !shop.address ||
      !shop.phone_number
    ) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return false;
    }

    return true;
  };

  useEffect(() => {
    getCurrentShop();
  }, [id]);

  return (
    <>
      {loading && <SmallLoading />}
      {error && <SystemAlert type={"error"} message={error} />}

      {shop && (
        <div
          className="shop-detail container p-4"
          style={{ backgroundColor: "white", borderRadius: 20 }}
        >
          <div className="form-container col-5">
            <form>
              <div className="form-group m-3">
                <label>Tên cửa hàng</label>
                <input
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  name="name"
                  value={shop.name}
                />
              </div>
              <div className="form-group m-3">
                <label>Chủ cửa hàng</label>
                <input
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  name="user_id"
                  value={shop.user_id}
                />
              </div>
              <div className="form-group m-3">
                <label>Gói đang sử dụng</label>
                <input
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  name="package_id"
                  value={shop.package_id}
                />
              </div>
              <div className="form-group m-3">
                <label>Logo thương hiệu</label>
                <input
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  name="logo"
                  value={shop.logo}
                />
              </div>
              <div className="form-group m-3">
                <label>Ngày đăng kí</label>
                <input
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  name="created_at"
                  value={shop.created_at}
                />
              </div>
              <div className="form-group m-3">
                <label>Mô tả</label>
                <input
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  name="description"
                  value={shop.description}
                />
              </div>
              <div className="form-group m-3">
                <label>Địa chỉ</label>
                <input
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  name="address"
                  value={shop.address}
                />
              </div>
              <div className="form-group m-3">
                <label>Số điện thoại</label>
                <input
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  name="phone_number"
                  value={shop.phone_number}
                />
              </div>
              <div className="form-group m-3">
                <label>Trạng thái</label>
                <select
                  onChange={handleChange}
                  name="status"
                  defaultValue={shop.status}
                  className="form-control"
                >
                  <option value="1" style={{ color: "green" }}>
                    Đang sử dụng
                  </option>
                  <option value="0" style={{ color: "red" }}>
                    Ngưng hoạt động
                  </option>
                </select>
              </div>
              <div className="form-group m-3">
                <button
                  className="btn btn-success"
                  type="submit"
                  onClick={handleUpdate}
                >
                  Cập nhật
                </button>
                <button
                  className="btn btn-danger m-1"
                  type="button"
                  onClick={handleDelete}
                >
                  Xóa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ShopDetail;
