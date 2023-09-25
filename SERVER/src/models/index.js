const Blog = require("./blog.model");
const Cart = require("./cart.model");
const CartDetail = require("./cartDetail.model");
const Category = require("./category.model");
const Coupon = require("./coupon.model");
const Industry = require("./industry.model");
const Order = require("./order.model");
const OrderDetail = require("./orderDetail.model");
const Package = require("./package.model");
const Product = require("./product.model");
const Rating = require("./rating.model");
const Shop = require("./shop.model");
const ShopUser = require("./shopUser.model");
const Supplier = require("./supplier.model");
const SupplieOrder = require("./supplieOrder.model");
const SupplieOrderDetail = require("./supplieOrderDetail.model");
const User = require("./user.model");

// Cart và User
Cart.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
User.hasMany(Cart, { foreignKey: "user_id" });

// CartDetail và Cart
CartDetail.belongsTo(Cart, { foreignKey: "cart_id", onDelete: "CASCADE" });
Cart.hasMany(CartDetail, { foreignKey: "cart_id" });
CartDetail.belongsTo(Product, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
});
Product.hasMany(CartDetail, { foreignKey: "product_id" });

// Category và Shop
Category.belongsTo(Shop, { foreignKey: "shop_id", onDelete: "CASCADE" });
Shop.hasMany(Category, { foreignKey: "shop_id" });

// Coupon và Shop
Coupon.belongsTo(Shop, { foreignKey: "shop_id" });
Shop.hasMany(Coupon, { foreignKey: "shop_id" });

// Order và Shop, User
Order.belongsTo(Shop, { foreignKey: "shop_id", onDelete: "CASCADE" });
Order.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
Shop.hasMany(Order, { foreignKey: "shop_id" });
User.hasMany(Order, { foreignKey: "user_id" });

// OrderDetail và Order
OrderDetail.belongsTo(Order, { foreignKey: "order_id", onDelete: "CASCADE" });
Order.hasMany(OrderDetail, { foreignKey: "order_id" });

// Product và Category, Industry, Shop
Product.belongsTo(Category, { foreignKey: "category_id", onDelete: "CASCADE" });
Product.belongsTo(Industry, { foreignKey: "industry_id", onDelete: "CASCADE" });
Product.belongsTo(Shop, { foreignKey: "shop_id", onDelete: "CASCADE" });
Category.hasMany(Product, { foreignKey: "category_id" });
Industry.hasMany(Product, { foreignKey: "industry_id" });
Shop.hasMany(Product, { foreignKey: "shop_id" });

// Rating và Product, User
Rating.belongsTo(Product, { foreignKey: "product_id", onDelete: "CASCADE" });
Rating.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
Product.hasMany(Rating, { foreignKey: "product_id" });
User.hasMany(Rating, { foreignKey: "user_id" });

// Shop và Package
Shop.belongsTo(Package, { foreignKey: "package_id" });
Package.hasMany(Shop, { foreignKey: "package_id" });

// ShopUser và Shop, User
ShopUser.belongsTo(Shop, { foreignKey: "shop_id", onDelete: "CASCADE" });
ShopUser.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
Shop.hasMany(ShopUser, { foreignKey: "shop_id" });
User.hasMany(ShopUser, { foreignKey: "user_id" });

// Supplier và Shop
Supplier.belongsTo(Shop, { foreignKey: "shop_id", onDelete: "CASCADE" });
Shop.hasMany(Supplier, { foreignKey: "shop_id" });

// SupplieOrder và Shop, Supplier
SupplieOrder.belongsTo(Shop, { foreignKey: "shop_id", onDelete: "CASCADE" });
SupplieOrder.belongsTo(Supplier, { foreignKey: "supplier_id" });
Shop.hasMany(SupplieOrder, { foreignKey: "shop_id" });
Supplier.hasMany(SupplieOrder, { foreignKey: "supplier_id" });

// SupplieOrderDetail và SupplieOrder, Product
SupplieOrderDetail.belongsTo(SupplieOrder, {
  foreignKey: "supplie_order_id",
  onDelete: "CASCADE",
});
SupplieOrderDetail.belongsTo(Product, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
});
SupplieOrder.hasMany(SupplieOrderDetail, { foreignKey: "supplie_order_id" });
Product.hasMany(SupplieOrderDetail, { foreignKey: "product_id" });

// User và Shop
Shop.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Shop, { foreignKey: "user_id" });

module.exports = {
  Blog,
  Cart,
  CartDetail,
  Category,
  Coupon,
  Industry,
  Order,
  OrderDetail,
  Package,
  Product,
  Rating,
  Shop,
  ShopUser,
  Supplier,
  SupplieOrder,
  SupplieOrderDetail,
  User,
};
