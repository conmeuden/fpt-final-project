import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function GlobalNotfound() {
  return (
    <div className="container-fluid" style={{ padding: 0 }}>
      <div
        className="container main"
        style={{ marginTop: "13vh", marginBottom: "10vh" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            minHeight: "50vh",
          }}
        >
          <Typography variant="h1" style={{ color: "#093f68" }}>
            404
          </Typography>
          <Typography variant="h6" style={{ color: "#093f68" }}>
            The page you’re looking for doesn’t exist.
          </Typography>
          <Link to={"/"}>
            <Button variant="contained">Trở về trang chủ</Button>
          </Link>
        </Box>
      </div>
    </div>
  );
}

export default GlobalNotfound;
