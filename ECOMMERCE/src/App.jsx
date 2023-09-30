import { Routes, Route } from "react-router-dom";
import SystemLayout from "./layouts/system.layout";
import WebLayout from "./layouts/web.layout";
import WebRouter from "./routes/web.router";
import SystemRouter from "./routes/system.router";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
