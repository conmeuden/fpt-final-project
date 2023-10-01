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
      <Link to={"/management/index"}>
        <ListItemButton className={isActive("/management/index")}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Trang chủ" />
        </ListItemButton>
      </Link>

      <Link to={"/management/orders"}>
        <ListItemButton className={isActive("/management/orders")}>
          <ListItemIcon>
            <Inventory2Icon />
          </ListItemIcon>
          <ListItemText primary="Đơn hàng" />
        </ListItemButton>
      </Link>

      <Link to={"/management/products"}>
        <ListItemButton className={isActive("/management/products")}>
          <ListItemIcon>
            <PostAddIcon />
          </ListItemIcon>
          <ListItemText primary="Kho sản phẩm" />
        </ListItemButton>
      </Link>
      <Link to={"/management/categories"}>
        <ListItemButton className={isActive("/management/categories")}>
          <ListItemIcon>
            <PostAddIcon />
          </ListItemIcon>
          <ListItemText primary="Danh mục sản phẩm" />
        </ListItemButton>
      </Link>

      <Link to={"/management/coupons"}>
        <ListItemButton className={isActive("/management/coupons")}>
          <ListItemIcon>
            <PolylineIcon />
          </ListItemIcon>
          <ListItemText primary="Mã giảm giá" />
        </ListItemButton>
      </Link>

      <Link to={"/management/suppliers"}>
        <ListItemButton className={isActive("/management/suppliers")}>
          <ListItemIcon>
            <PolylineIcon />
          </ListItemIcon>
          <ListItemText primary="Nhà cung cấp" />
        </ListItemButton>
      </Link>

      <Link to={"/management/supplie-orders"}>
        <ListItemButton className={isActive("/management/supplie-orders")}>
          <ListItemIcon>
            <PolylineIcon />
          </ListItemIcon>
          <ListItemText primary="Hóa đơn nhập hàng" />
        </ListItemButton>
      </Link>

      <Link to={"/management/customers"}>
        <ListItemButton className={isActive("/management/customers")}>
          <ListItemIcon>
            <AddBusinessIcon />
          </ListItemIcon>
          <ListItemText primary="Quản lý khách hàng" />
        </ListItemButton>
      </Link>
      <Link to={"/management/email"}>
        <ListItemButton className={isActive("/management/email")}>
          <ListItemIcon>
            <ForwardToInboxIcon />
          </ListItemIcon>
          <ListItemText primary="Viết email" />
        </ListItemButton>
      </Link>
    </List>
  );
}
