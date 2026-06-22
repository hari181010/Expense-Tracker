import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./authReducer";
export const authStore = configureStore({
  reducer: {AuthReducer}
});