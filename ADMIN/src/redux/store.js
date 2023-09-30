/** @format */

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth.slice";
import industriesSlice from "./slices/industries.slice";
import userSlice from "./slices/user.slice";
import blogSlice from "./slices/blog.slice";

export default configureStore({
  reducer: {
    authentication: authSlice,
    user: userSlice,
    industries: industriesSlice,
    blogs:blogSlice
  },
});
