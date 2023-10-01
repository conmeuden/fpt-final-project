import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth.slice";
import productSlice from "./slices/product.slice";
import categorySlice from "./slices/category.slice";

export default configureStore({
  reducer: {
    authentication: authSlice,
    product: productSlice,
    category: categorySlice,
  },
});
