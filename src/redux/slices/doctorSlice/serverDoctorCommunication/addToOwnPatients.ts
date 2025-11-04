import { RootState } from "@/redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, getDatabase, ref, set } from "firebase/database";

export const addToOwnPatients = createAsyncThunk(
  "doctorSlice/addToOwnPatients",
  async (userId: string, { getState, rejectWithValue, fulfillWithValue }) => {
    const db = getDatabase();
    const state = getState() as RootState;
    const doctorId = state.authentication.id;
    const path = ref(db, `doctors/${doctorId}/my-patients/${userId}`);

    const snapshot = await get(path);

    if (snapshot.exists()) return fulfillWithValue("already added");

    try {
      await set(path, true);
    } catch (error) {
      return rejectWithValue("something went wrong");
    }
  },
);
