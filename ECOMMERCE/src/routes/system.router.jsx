import { Routes, Route } from "react-router-dom";
import SystemPage from "./../pages/System/system.page";
import AppNotfound from "./../components/Notfound/AppNotfound";
import WarehousePage from "./../pages/Warehouse/warehouse.page";
import CouponPage from "./../pages/Coupon/coupon.page";

function SystemRouter() {
  return (
    <>
      <Routes>
        <Route path="/coupons" element={<CouponPage />} />
        <Route path="/products" element={<WarehousePage />} />
        <Route path="/index" element={<SystemPage />} />
        <Route path="/" element={<SystemPage />} />
        <Route path="*" element={<AppNotfound />} />
      </Routes>
    </>
  );
}

export default SystemRouter;
