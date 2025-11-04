import { RootState } from "@/redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, getDatabase, remove } from "firebase/database";
import { showPopupMessage } from "../../popupMessages-slice/popupMessagesSlice";

export const deleteAppointment = createAsyncThunk(
  "appointments",
  async (id: string, { getState, dispatch }) => {
    const state = getState() as RootState;
    const authId = state.authentication.id;
    const rights = state.authentication.rights;

    const path = ref(
      getDatabase(),
      `${rights === "user" ? "users" : "doctors"}/${authId}/appointments/${id}`,
    );

    try {
      await remove(path);
    } catch (error) {
      dispatch(
        showPopupMessage({ text: "Не удалось удалить запись", type: "error" }),
      );
    }
  },
);
