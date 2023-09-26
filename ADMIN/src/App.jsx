import { useEffect } from "react";
import InitRouter from "./routes/initRouter";
import { refresh } from "./redux/slices/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ScreenLoading from "./components/Loading/ScreenLoading";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthentication, loading } = useSelector(
    (state) => state.authentication
  );

  useEffect(() => {
    const tokenInLocalStorage = localStorage.getItem("access_token");

    if (tokenInLocalStorage && !isAuthentication) {
      dispatch(refresh({ navigate }));
    }
  }, [dispatch, isAuthentication, navigate]);

  return (
    <>
      {loading && <ScreenLoading />}
      <InitRouter />
    </>
  );
}

export default App;
