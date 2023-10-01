import { Routes, Route } from "react-router-dom";
import SystemLayout from "./layouts/system.layout";
import WebLayout from "./layouts/web.layout";
import WebRouter from "./routes/web.router";
import SystemRouter from "./routes/system.router";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <Routes>
          <Route
            path="/management/*"
            element={
              <SystemLayout>
                <SystemRouter />
              </SystemLayout>
            }
          />
          <Route
            path="/*"
            element={
              <WebLayout>
                <WebRouter />
              </WebLayout>
            }
          />
        </Routes>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
