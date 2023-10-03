/** @format */

import { Routes, Route } from "react-router-dom";
import AppLayout from "./../layouts/app.layout";
import LoginPage from "./../pages/Login/login.page";
import IndexPage from "./../pages/Index/index.page";
import IndustriesPage from "../pages/Industries/industries.page";
import IndustryDetail from "../pages/Industries/industryDetail.page";
import AppNotfound from "./../components/Notfound/AppNotfound";
import GlobalNotfound from "./../components/Notfound/GlobalNotfound";
import BaseComponent from "../pages/BaseComponent/BaseComponent.page";
import UserPage from "./../pages/User/user.page";
import UserDetail from "./../pages/User/UserDetail.page";
import EmailPage from "./../pages/Email/email.page";
import BlogPage from "../pages/Blog/blog.page";
import BlogDetail from "../pages/Blog/blogDetail.page";
import BlogCreate from "../pages/Blog/blogCreate.page";


import PackagePage from "../pages/Packages/packages.page";
import PackageDetail from "../pages/Packages/PackageDetail.page";

function AppRouter() {
  return (
    //Thêm router ở đây
    <Routes>
      <Route path="/base-components" element={<BaseComponent />} />

      <Route path="/users/:id" element={<UserDetail />} />
      <Route path="/users" element={<UserPage />} />
      <Route path="/blogs/:id" element={<BlogDetail/> } />
      <Route path="/blogs" element={<BlogPage/> } />
      <Route path="/blogs/create" element={<BlogCreate/> } />
      <Route path="/shops" element={<h1>shops page</h1>} />
      <Route path="/email" element={<EmailPage />} />
      <Route path="/industries" element={<IndustriesPage />} />
      <Route path="/industries/:id" element={<IndustryDetail />} />
      <Route path="/products" element={<h1>products page</h1>} />
      <Route path="/packages" element={<PackagePage/>} />
      <Route path="/packages/:id" element={<PackageDetail/>} />
      <Route path="/index" element={<IndexPage />} />
      <Route path="/" element={<IndexPage />} />
      <Route path="*" element={<AppNotfound />} />
    </Routes>
  );
}

function InitRouter() {
  return (
    <Routes>
      <Route
        path="/dashboard/*"
        element={
          <AppLayout>
            <AppRouter />
          </AppLayout>
        }
      />

      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<GlobalNotfound />} />
    </Routes>
  );
}

export default InitRouter;
