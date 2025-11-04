import {
  StoredMedicalRecordT,
  storedMedicalRecordsFromServerT,
} from "@/redux/slices/doctorSlice/serverDoctorCommunication/types";
import { RootState } from "@/redux/store";
import { arrFromFirebaseObj } from "@/shared/utils/functions/convert/array-from-firebase-object";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, getDatabase, ref } from "firebase/database";

export const getMedicalCard = createAsyncThunk(
  "patientSlice/getMedicalCard",
  async (_, { rejectWithValue, getState }) => {
    const db = getDatabase();
    const state = getState() as RootState;
    const id = state.authentication.id;
    const path = ref(db, `users-info/${id}/medical-records`);

    try {
      const snapshot = await get(path);
      const data = snapshot.val();
      if (!snapshot.exists() || !storedMedicalRecordsFromServerT.guard(data))
        throw Error();

      const parsedRecords = arrFromFirebaseObj<StoredMedicalRecordT>(data);

      return parsedRecords;
    } catch (error) {
      return rejectWithValue("");
    }
  },
);
