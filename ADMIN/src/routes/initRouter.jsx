import { Routes, Route } from "react-router-dom";
import AppLayout from "./../layouts/app.layout";
import LoginPage from "./../pages/login.page";
import IndexPage from "./../pages/index.page";
import PageNotFound from "./../pages/notfound.page";

function AppRouter() {
  return (
    <Routes>
      <Route path="/blogs" element={<h1>blogs page</h1>} />
      <Route path="/shops" element={<h1>shops page</h1>} />
      <Route path="/email" element={<h1>email page</h1>} />
      <Route path="/industries" element={<h1>industries page</h1>} />
      <Route path="/products" element={<h1>products page</h1>} />
      <Route path="/packages" element={<h1>packages page</h1>} />
      <Route path="/index" element={<IndexPage />} />
      <Route path="/" element={<IndexPage />} />
      <Route path="*" element={<PageNotFound />} />
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
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default InitRouter;
