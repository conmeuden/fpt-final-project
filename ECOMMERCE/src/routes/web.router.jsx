import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/home.page";
import AboutPage from "./../pages/About/about.page";
import TeamPage from "./../pages/Team/team.page";
import LoginPage from "../pages/Login/login.page";
import RegisterPage from "./../pages/Register/register.page";
import GlobalNotfound from "./../components/Notfound/GlobalNotfound";

function WebRouter() {
  return (
    <>
      <Routes>
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<GlobalNotfound />} />
      </Routes>
    </>
  );
}

export default WebRouter;
