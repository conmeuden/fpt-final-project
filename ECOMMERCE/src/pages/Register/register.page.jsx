import "./style.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/slices/auth.slice";
import { useNavigate } from "react-router-dom";
import ScreenLoading from "../../components/Loading/ScreenLoading";
import SystemAlert from "./../../components/Alert/Alert";
function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading } = useSelector((state) => state.authentication);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    shop_name: "",
    phone_number: "",
    address: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (e) => {
    setErrorMessage(null);
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateFormData = () => {
    if (
      !formData.full_name ||
      !formData.shop_name ||
      !formData.phone_number ||
      !formData.address ||
      !formData.email ||
      !formData.password ||
      !formData.repeatPassword
    ) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin.");
      return false;
    } else if (formData.password !== formData.repeatPassword) {
      setErrorMessage("Mật khẩu và mật khẩu xác nhận không khớp.");
      return false;
    }
    return true;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu trước khi gọi action register
    if (validateFormData()) {
      dispatch(register({ ...formData, navigate }));
    }
  };

  return (
    <>
      {loading && <ScreenLoading />}
      {error && <SystemAlert type={"error"} message={error} />}
      {errorMessage && <SystemAlert type={"error"} message={errorMessage} />}
      <div className="container-fluid p-0 register-page mb-5">
        <div className="container">
          <div className="row" style={{ alignItems: "center" }}>
            <div className="login-banner col-sm-12 col-md-12 col-xl-8">
              <img
                src="/images/sign-up-bg.png"
                alt="lg"
                style={{ width: "80%" }}
              />
            </div>
            <div className="login-form col-sm-12 col-md-12 col-xl-4">
              <h2 className="m-3">Tạo một cửa hàng !</h2>
              <form onSubmit={handleRegister}>
                <div className="form-group m-3">
                  <label>Tên đầy đủ của bạn</label>
                  <input
                    required
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên đầy đủ..."
                  />
                </div>
                <div className="form-group m-3">
                  <label>Tên của cửa hàng</label>
                  <input
                    required
                    name="shop_name"
                    value={formData.shop_name}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên cửa hàng..."
                  />
                </div>
                <div className="form-group m-3">
                  <label>Số điện thoại</label>
                  <input
                    required
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Nhập số điện thoại..."
                  />
                </div>
                <div className="form-group m-3">
                  <label>Địa chỉ cửa hàng</label>
                  <input
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Nhập địa chỉ cửa hàng..."
                  />
                </div>
                <div className="form-group m-3">
                  <label>Địa chỉ email</label>
                  <input
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    className="form-control"
                    placeholder="Nhập email..."
                  />
                </div>
                <div className="form-group m-3">
                  <label>Mật khẩu</label>
                  <input
                    required
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    className="form-control"
                    placeholder="Nhập mật khẩu..."
                  />
                </div>
                <div className="form-group m-3">
                  <label>Nhập lại mật khẩu</label>
                  <input
                    required
                    name="repeatPassword"
                    value={formData.repeatPassword}
                    onChange={handleChange}
                    type="password"
                    className="form-control"
                    placeholder="Nhập lại mật khẩu..."
                  />
                </div>
                <div className="form-group m-3">
                  <button className="btn btn-primary" style={{ width: "100%" }}>
                    Tạo cửa hàng
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
