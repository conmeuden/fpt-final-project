import Footer from "../components/Footer/Footer";
import WebHeader from "../components/Header/WebHeader";

// eslint-disable-next-line react/prop-types
function WebLayout({ children }) {
  return (
    <>
      <WebHeader />
      <main style={{ marginTop: 72 }}>{children}</main>
      <Footer />
    </>
  );
}

export default WebLayout;
