import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "./style.css";

function WebHeader() {
  return (
    <header>
      <Navbar
        fixed="top"
        collapseOnSelect
        expand="lg"
        id="web-header"
        className="p-3"
      >
        <Container>
          <Link to="/">
            <h1>
              <span style={{ color: "orange", fontWeight: "bold" }}>
                DALAPHA
              </span>
              <span style={{ color: "white", fontWeight: "bold" }}>Shop</span>
            </h1>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto ">
              <Link to="/about">Giới thiệu</Link>
              <Link to="/team">Nhóm phát triển</Link>
            </Nav>
            <Nav>
              <Link to="/sign-in">Đăng nhập</Link>
              <Link to="/sign-up">Đăng ký</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default WebHeader;
