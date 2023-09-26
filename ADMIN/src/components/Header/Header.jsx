import { Avatar } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { deepOrange } from "@mui/material/colors";

import "./style.css";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleLogin = () => {
    setAnchorEl(null);
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <div className="header container-fluid">
      <div>
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
