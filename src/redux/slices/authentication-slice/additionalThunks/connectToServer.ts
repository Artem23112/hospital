import { RootState } from "@/redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, getDatabase, ref } from "firebase/database";
import { doctorConnectToServer } from "../../doctorSlice/serverDoctorCommunication/doctorConnectToServer";
import { patientConnectToServer } from "../../patient-slice/additionalThunks/serverPatientCommunication/patientConnectToServer";

export const connectToServer = createAsyncThunk(
  "authentication/connect",
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const uid = state.authentication.id;
      if (!uid) throw new Error("Пользователь не авторизован");

      const info = await get(ref(getDatabase(), `doctors-info/${uid}`));

      if (info.exists()) {
        dispatch(doctorConnectToServer(uid));
        return "admin";
      } else {
        dispatch(patientConnectToServer(uid));
        return "user";
      }
    } catch (err: any) {
      return rejectWithValue(err.code);
    }
  },
);
