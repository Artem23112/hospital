import { showPopupMessage } from "@/redux/slices/popupMessages-slice/popupMessagesSlice";
import { RootState } from "@/redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, update } from "firebase/database";
import { StatusAppointmentT } from "../../patient-slice/types";

export const doctorAnswer = createAsyncThunk(
  "doctorSlice/doctorAnswer",
  async (
    { userId, appointmentId, type }: PassedData,
    { getState, dispatch },
  ) => {
    const state = getState() as RootState;
    const doctorId = state.authentication.id;

    const db = getDatabase();
    const userPath = ref(db, `users/${userId}/appointments/${appointmentId}`);
    const doctorPath = ref(
      db,
      `doctors/${doctorId}/appointments/${appointmentId}`,
    );

    try {
      await update(userPath, { status: type });
      await update(doctorPath, { status: type });
    } catch (error) {
      dispatch(
        showPopupMessage({ text: "Упс, что-то пошло не так", type: "error" }),
      );
    }
  },
);

type PassedData = {
  userId: string;
  appointmentId: string;
  type: StatusAppointmentT;
};
