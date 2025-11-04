import {
  PatientAppointmentT,
  UniquePatientAppointmentT,
  patientAppointmentsFromServer,
} from "@/redux/slices/patient-slice/additionalThunks/serverPatientCommunication/types";
import { setPatientAppointments } from "@/redux/slices/patient-slice/patientSlice";
import { AppDispatch } from "@/redux/store";
import { cleanExpiredAppointments } from "@/shared/utils/functions/clean/clean-expired-appointments";
import { arrFromFirebaseObj } from "@/shared/utils/functions/convert/array-from-firebase-object";
import { sortAppointmentsList } from "@/shared/utils/functions/sort/sort-appointments-list";
import { getDatabase, onValue, ref } from "firebase/database";

export function userSubscribeToAppointments(
  dispatch: AppDispatch,
  userId: string,
) {
  const path = ref(getDatabase(), `users/${userId}/appointments`);

  onValue(path, async (snapshot) => {
    const data: unknown = snapshot.val();
    if (!patientAppointmentsFromServer.guard(data)) return;

    const parsedAppointments = arrFromFirebaseObj<PatientAppointmentT>(data);
    await cleanExpiredAppointments(parsedAppointments, userId, "user");

    const sorted =
      sortAppointmentsList<UniquePatientAppointmentT>(parsedAppointments);

    dispatch(setPatientAppointments(sorted));
  });
}
