import { UniquePatientInfoT } from "@/redux/slices/patient-slice/additionalThunks/serverPatientCommunication/types";

export function getPatientInfoById(
  list: UniquePatientInfoT[],
  id: string,
): UniquePatientInfoT | undefined {
  return list.find((patient) => patient.id === id);
}
