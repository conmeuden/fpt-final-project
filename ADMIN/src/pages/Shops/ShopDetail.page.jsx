import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ShopsService from "../../services/shops.service";
import PackageService from "../../services/packages.service";
import UploadService from "../../services/upload.service";
import SystemAlert from "./../../components/Alert/Alert";
import SmallLoading from "./../../components/Loading/SmallLoading";
import Toastify from "../../components/Toastify/Toastify";

function ShopDetail() {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [toast, setToast] = useState({ type: "", message: "" });

  const getCurrentShop = async () => {
    try {
      setLoading(true);
      const dataShop = await ShopsService.getShopById(id);
      const dataPackage = await PackageService.getAllPackages({});
      setShop(dataShop);
      setPkg(dataPackage.packages.rows);
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
      setToast({ type: "success", message: "Update thành công" });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setToast({ type: "error", message: error.message });
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
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
      setToast({ type: "success", message: "Delete thành công" });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setToast({ type: "error", message: error.message });
      setLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    const img = await UploadService.singleFile({ file });
    setShop({
      ...shop,
      logo: img,
    });
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

      {shop && pkg && (
        <div
          className="shop-detail container p-4"
          style={{ backgroundColor: "white", borderRadius: 20 }}
        >
          <form className="d-flex">
            <div className="form-container col-5">
              <div className="form-group m-3">
                <label>Tên cửa hàng</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  name="name"
                  value={shop.name}
                />
              </div>
              <div className="form-group m-3">
                <label>Chủ cửa hàng</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  name="user_id"
                  value={shop.user.full_name}
                />
              </div>
              <div className="form-group m-3">
                <label>Gói đang sử dụng</label>
                <select
                  onChange={handleInputChange}
                  name="package_id"
                  className="form-control"
                  defaultValue={shop.package.id}
                >
                  {pkg.map((data, index) => (
                    <option key={index} value={data.id}>
                      {data.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group m-3">
                <label>Ngày đăng kí</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  name="created_at"
                  value={shop.created_at}
                />
              </div>
              <div className="form-group m-3">
                <label>Mô tả</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  name="description"
                  value={shop.description}
                />
              </div>
              <div className="form-group m-3">
                <label>Địa chỉ</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  name="address"
                  value={shop.address}
                />
              </div>
              <div className="form-group m-3">
                <label>Số điện thoại</label>
                <input
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  name="phone_number"
                  value={shop.phone_number}
                />
              </div>
              <div className="form-group m-3">
                <label>Trạng thái</label>
                <select
                  onChange={handleInputChange}
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
            </div>
            <div className="form-container col-7">
              <div className="form-group m-3">
                <label className="d-block">Logo thương hiệu</label>
                <img
                  src={shop.logo}
                  alt="logo-thuong-hieu"
                  style={{
                    width: 450,
                    height: 450,
                  }}
                />
                <input
                  type="file"
                  className="form-control"
                  name="icon"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </form>
        </div>
      )}
      <Toastify type={toast.type} message={toast.message} />
    </>
  );
}

export default ShopDetail;
