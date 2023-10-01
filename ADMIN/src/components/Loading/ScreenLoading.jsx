import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function ScreenLoading() {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: 1203 }} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default ScreenLoading;
