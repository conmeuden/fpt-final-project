import { Avatar } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { deepOrange } from "@mui/material/colors";
import { Link } from "react-router-dom";
import "./style.css";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  return (
    <div className="header container-fluid">
      <div>
        <Link
          to={"https://backend-dalapha.onrender.com/api/doc/"}
          target="_blank"
        >
          <button className="btn btn-success">
            Link document API, xem khi cần
          </button>
        </Link>

        <Avatar
          sx={{ bgcolor: deepOrange[500] }}
          onClick={handleClick}
          style={{ cursor: "pointer", float: "right" }}
        />

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <Link to={"/login"}>
            <MenuItem onClick={handleLogin}>Logout</MenuItem>
          </Link>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
