import { Routes, Route } from "react-router-dom";
import SystemPage from "./../pages/System/system.page";
import AppNotfound from "./../components/Notfound/AppNotfound";
import WarehousePage from "./../pages/Warehouse/warehouse.page";
import CouponPage from "./../pages/Coupon/coupon.page";
import CouponDetailPage from "./../pages/Coupon/couponDetail.page";
import CreateCouponPage from "../pages/Coupon/createCoupon.page";

function SystemRouter() {
  return (
    <>
      <Routes>
        <Route path="/coupons/create" element={<CreateCouponPage />} />
        <Route path="/coupons/:id" element={<CouponDetailPage />} />
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
