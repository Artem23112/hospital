import { MedicalRecordT } from "@/redux/slices/doctorSlice/serverDoctorCommunication/types";
import { RootState } from "@/redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, set } from "firebase/database";
import { v4 } from "uuid";

export const addRecordToCard = createAsyncThunk(
  "doctorSlice/addRecordToCard",
  async (payload: MedicalRecordT, { getState, rejectWithValue }) => {
    const db = getDatabase();
    const path = ref(
      db,
      `users-info/${payload.patientId}/medical-records/${v4()}`,
    );
    const state = getState() as RootState;
    const doctorId = state.authentication.id;

    const newRecord = {
      ...payload,
      doctorId: doctorId!,
    };

    try {
      await set(path, newRecord);
    } catch (error) {
      return rejectWithValue("error");
    }
  },
);
