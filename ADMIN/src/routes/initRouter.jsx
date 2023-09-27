import { Routes, Route } from "react-router-dom";
import AppLayout from "./../layouts/app.layout";
import LoginPage from "./../pages/Login/login.page";
import IndexPage from "./../pages/Index/index.page";
import AppNotfound from "./../components/Notfound/AppNotfound";
import GlobalNotfound from "./../components/Notfound/GlobalNotfound";
import { useSelector } from "react-redux";

function AppRouter() {
  return (
    //Thêm router ở đây
    <Routes>
      <Route path="/blogs" element={<h1>blogs page</h1>} />
      <Route path="/shops" element={<h1>shops page</h1>} />
      <Route path="/email" element={<h1>email page</h1>} />
      <Route path="/industries" element={<h1>industries page</h1>} />
      <Route path="/products" element={<h1>products page</h1>} />
      <Route path="/packages" element={<h1>packages page</h1>} />
      <Route path="/index" element={<IndexPage />} />
      <Route path="/" element={<IndexPage />} />
      <Route path="*" element={<AppNotfound />} />
    </Routes>
  );
}

function InitRouter() {
  const { isAuthentication } = useSelector((state) => state.authentication);

  return (
    <Routes>
      {isAuthentication && (
        <Route
          path="/dashboard/*"
          element={
            <AppLayout>
              <AppRouter />
            </AppLayout>
          }
        />
      )}

      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<GlobalNotfound />} />
    </Routes>
  );
}

export default InitRouter;
