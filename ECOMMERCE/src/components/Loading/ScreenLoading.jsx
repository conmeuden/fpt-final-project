import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function ScreenLoading() {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: 2000 }} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default ScreenLoading;
