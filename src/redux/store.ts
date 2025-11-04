import doctorSliceReducer from "@/redux/slices/doctorSlice/doctorSlice";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authenticationReducer from "./slices/authentication-slice/authenticationSlice";
import patientSliceReducer from "./slices/patient-slice/patientSlice";
import popupMessagesReducer from "./slices/popupMessages-slice/popupMessagesSlice";

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    doctorSlice: doctorSliceReducer,
    patientSlice: patientSliceReducer,
    popupMessage: popupMessagesReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
