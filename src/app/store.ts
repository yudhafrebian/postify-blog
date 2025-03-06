import { configureStore } from "@reduxjs/toolkit";
import formReducer from "@/utils/redux/feature/formSlice";
import authReducer  from "@/utils/redux/feature/authSlice"
import sectionReducer from "@/utils/redux/feature/sectionSlice"

export const store = configureStore({
  reducer: {
    formState: formReducer,
    authState: authReducer,
    sectionState: sectionReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
