import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Admin
          </Typography>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}><a href="./login">Đăng nhập</a></MenuItem>
            <MenuItem onClick={handleClose}><a href="#">Quản lý người dùng</a></MenuItem>
            <MenuItem onClick={handleClose}><a href="#">Quản lý bài viết</a></MenuItem>
            <MenuItem onClick={handleClose}><a href="#">Thống kê</a></MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    );
  }
  export default Navbar;