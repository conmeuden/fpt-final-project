/** @format */

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth.slice";
import industriesSlice from "./slices/industries.slice";

export default configureStore({
  reducer: {
    authentication: authSlice,
    industries: industriesSlice,
  },
});
