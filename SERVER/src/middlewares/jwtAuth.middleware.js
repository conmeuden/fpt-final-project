const { verifyToken } = require("../services/jwt.service");
const { log } = require("../services/discord.logger");

const publicUrls = [
  "/api/blogs",
  "/api/industries",
  "/api/packages",
  "/api/doc",
  "/uploads",
  "/api/rating",
];

const salerUrls = [
  "/api/categories",
  "/api/coupons",
  "/api/shops",
  "/api/shopUser",
  "/api/suppliers",
  "/api/upload",
  "/api/products",
];

const jwtAuthMiddleware = (req, res, next) => {
  const urlRequest = req.originalUrl;
  const isPublicUrl = publicUrls.some((url) => urlRequest.startsWith(url));

  if (
    (isPublicUrl && req.method === "GET") ||
    (urlRequest.startsWith("/api/auth") && req.method === "POST") ||
    (urlRequest.startsWith("/api/auth") && req.method === "GET")
  ) {
    return next();
  }

  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Không có token, truy cập bị từ chối" });
  }

  const [bearer, token] = authHeader.split(" ");

  if (!token || bearer !== "Bearer") {
    return res.status(401).json({ message: "Token không hợp lệ" });
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }

    const role = decoded.role;

    if (role === "ADMIN") {
      req.user = decoded;
      return next();
    }

    const isSalerUrl = salerUrls.some((url) => urlRequest.startsWith(url));

    if (isSalerUrl) {
      req.user = decoded;
      return next();
    } else {
      return res.status(403).json({ message: "Không có quyền truy cập" });
    }
  } catch (err) {
    log("Lỗi trong middleware authentication: " + err);
    res.status(401).json({ message: "Token không hợp lệ" });
  }
};

module.exports = jwtAuthMiddleware;
