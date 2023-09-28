import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { login } from "../../redux/slices/auth.slice";
import ScreenLoading from "../../components/Loading/ScreenLoading";
import SystemAlert from "../../components/Alert/Alert";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading } = useSelector((state) => state.authentication);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ ...formData, navigate }));
  };
  return (
    <>
      {loading && <ScreenLoading />}
      {error && <SystemAlert type={"error"} message={error} />}
      <div className="container-fluid p-0 login-page">
        <div className="container">
          <div className="row" style={{ alignItems: "center" }}>
            <div className="login-banner col-8">
              <img
                src="/images/login-bg.svg"
                alt="lg"
                style={{ width: "80%" }}
              />
            </div>
            <div className="login-form col-4">
              <h2 className="m-3">Chào mừng trở lại !</h2>
              <form onSubmit={handleLogin}>
                <div className="form-group m-3">
                  <label>Nhập email</label>
                  <input
                    onChange={handleChange}
                    name="email"
                    value={formData.email}
                    type="email"
                    className="form-control"
                    placeholder="Nhập email của bạn..."
                  />
                </div>
                <div className="form-group m-3">
                  <label>Nhập mật khẩu</label>
                  <input
                    onChange={handleChange}
                    name="password"
                    value={formData.password}
                    type="password"
                    className="form-control"
                    placeholder="Nhập mật khẩu của bạn..."
                  />
                </div>
                <div className="form-group m-3">
                  <button className="btn btn-primary" style={{ width: "100%" }}>
                    Đăng nhập
                  </button>
                </div>
              </form>
              <hr className="hr" />
              <Link to="/sign-up">
                <div>
                  <Button variant="link">Tạo một cửa hàng</Button>
                </div>
                <div>
                  <Button variant="link">Quên mật khẩu?</Button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;