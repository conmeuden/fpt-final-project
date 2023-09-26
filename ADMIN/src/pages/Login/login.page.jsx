import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/auth.slice";
import { useNavigate } from "react-router-dom";
import ScreenLoading from "../../components/Loading/ScreenLoading";
import SystemAlert from "../../components/Alert/Alert";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password, navigate }));
  };

  return (
    <div className="login-page container-fluid">
      {error && <SystemAlert type={"error"} message={"Lỗi đăng nhập"} />}
      {loading && <ScreenLoading />}
      <div
        style={{
          margin: "200px auto",
          maxWidth: "400px",
          backgroundColor: "var(--bg-color)",
          padding: "20px 80px",
          borderRadius: 20,
          color: "white",
        }}
      >
        <div className="login-page-title" style={{ textAlign: "right" }}>
          <h1>LOGIN !</h1>
          <h3>Welcome back</h3>
        </div>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <center>
            <Button variant="success" type="submit">
              Go to dashboard
            </Button>
          </center>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
