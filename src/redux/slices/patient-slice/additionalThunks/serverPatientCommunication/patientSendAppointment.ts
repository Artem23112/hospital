import { showPopupMessage } from "@/redux/slices/popupMessages-slice/popupMessagesSlice";
import { RootState } from "@/redux/store";
import { checkDuplicateAppointment } from "@/shared/utils/functions/check/check-duplicate-appointment";
import { additionDateWithTime } from "@/shared/utils/functions/convert/addition-date-with-time";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, set } from "firebase/database";
import { v4 } from "uuid";
import { GeneralAppointmentT } from "../../types";

export const patientSendAppointment = createAsyncThunk(
  "patientSlice/sendApplication",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState;
    const {
      chosenDoctor: doctorId,
      chosenDate,
      chosenTime,
    } = state.patientSlice.appointmentData;
    if (!doctorId || !chosenDate || !chosenTime) {
      dispatch(
        showPopupMessage({
          text: "Извините, но вы выбрали не все, что необходимо для записи",
          type: "warning",
        }),
      );
      return rejectWithValue("Данных недостаточно");
    }

    const db = getDatabase();
    const fullDateISO = additionDateWithTime(chosenDate, chosenTime);
    const patientId = state.authentication.id;
    const messagePattern: GeneralAppointmentT = {
      status: "enrolled",
      fullDateISO,
    };

    const id = v4();
    const doctorAppointmentPath = ref(
      db,
      `doctors/${doctorId}/appointments/${id}`,
    );
    const patientAppointmentPath = ref(
      db,
      `users/${patientId}/appointments/${id}`,
    );

    try {
      const { isExists } = await checkDuplicateAppointment(
        doctorId,
        fullDateISO,
      );

      if (isExists) throw new Error("Запись на данное число уже есть");

      set(doctorAppointmentPath, {
        ...messagePattern,
        userId: patientId,
      });

      set(patientAppointmentPath, {
        ...messagePattern,
        doctorId,
      });

      dispatch(
        showPopupMessage({
          text: "Вы записались к врачу",
          type: "success",
        }),
      );
    } catch (e) {
      const err = e as Error;
      const text =
        err.message || "Упс, что-то пошло не так, записаться не удалось";

      dispatch(showPopupMessage({ text, type: "error" }));
      return rejectWithValue("");
    }
  },
);
