const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const blogRoute = require("./blog.route");
const categoryRoute = require("./category.route");
const couponRoute = require("./coupon.route");
const orderRoute = require("./order.route");
const industryRoute = require("./industry.route");
const packageRoute = require("./package.route");
const ratingRoute = require("./rating.route");
const shopRoute = require("./shop.route");
const shopUserRoute = require("./shopUser.route");
const supplierRoute = require("./supplier.route");
const docRoute = require("./doc.route");
const uploadRoute = require("./upload.route");
const EmailRoute = require("./email.route");
const ProductRoute = require("./product.route");

const initRoute = (app) => {
  app.use("/api/users", userRoute);
  app.use("/api/auth", authRoute);
  app.use("/api/blogs", blogRoute);
  app.use("/api/categories", categoryRoute);
  app.use("/api/coupons", couponRoute);
  app.use("/api/industries", industryRoute);
  app.use("/api/orders", orderRoute);
  app.use("/api/packages", packageRoute);
  app.use("/api/rating", ratingRoute);
  app.use("/api/shops", shopRoute);
  app.use("/api/shopUser", shopUserRoute);
  app.use("/api/suppliers", supplierRoute);
  app.use("/api/upload", uploadRoute);
  app.use("/api/send-mail", EmailRoute);
  app.use("/api/products", ProductRoute);

  app.use("/api/doc", docRoute);
};

module.exports = initRoute;
