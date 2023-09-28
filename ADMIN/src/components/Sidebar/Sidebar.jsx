import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { Link, useLocation } from "react-router-dom";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PolylineIcon from "@mui/icons-material/Polyline";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";

import "./style.css";

export default function Sidebar() {
  const location = useLocation();
  const isActive = (url) => {
    if (location.pathname.toString().startsWith(url)) {
      return "sidebar-active";
    }
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      style={{ margin: "0 auto" }}
    >
      <Link to={"/dashboard/index"}>
        <ListItemButton className={isActive("/dashboard/index")}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Trang chủ" />
        </ListItemButton>
      </Link>

      <Link to={"/dashboard/packages"}>
        <ListItemButton className={isActive("/dashboard/packages")}>
          <ListItemIcon>
            <Inventory2Icon />
          </ListItemIcon>
          <ListItemText primary="Gói sử dụng" />
        </ListItemButton>
      </Link>

      <Link to={"/dashboard/users"}>
        <ListItemButton className={isActive("/dashboard/users")}>
          <ListItemIcon>
            <Inventory2Icon />
          </ListItemIcon>
          <ListItemText primary="Người dùng" />
        </ListItemButton>
      </Link>

      <Link to={"/dashboard/blogs"}>
        <ListItemButton className={isActive("/dashboard/blogs")}>
          <ListItemIcon>
            <PostAddIcon />
          </ListItemIcon>
          <ListItemText primary="Tin tức" />
        </ListItemButton>
      </Link>
      <Link to={"/dashboard/industries"}>
        <ListItemButton className={isActive("/dashboard/industries")}>
          <ListItemIcon>
            <PolylineIcon />
          </ListItemIcon>
          <ListItemText primary="Ngành hàng" />
        </ListItemButton>
      </Link>
      <Link to={"/dashboard/shops"}>
        <ListItemButton className={isActive("/dashboard/shops")}>
          <ListItemIcon>
            <AddBusinessIcon />
          </ListItemIcon>
          <ListItemText primary="Quản lý các cửa hàng" />
        </ListItemButton>
      </Link>
      <Link to={"/dashboard/email"}>
        <ListItemButton className={isActive("/dashboard/email")}>
          <ListItemIcon>
            <ForwardToInboxIcon />
          </ListItemIcon>
          <ListItemText primary="Viết email" />
        </ListItemButton>
      </Link>
    </List>
  );
}
