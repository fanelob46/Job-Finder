import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlices";
import { apiSlice } from "./Slices/apiSlice";
import { jobApiSlice } from "./Slices/jobApiSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    
    [apiSlice.reducerPath]: apiSlice.reducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, jobApiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
