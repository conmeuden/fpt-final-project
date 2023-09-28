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
          <Link to={"/"}>
            <Navbar.Brand>
              <span id="dalapha">DALAPHA</span>
              <span id="ecommerce">ecommerce</span>
            </Navbar.Brand>
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