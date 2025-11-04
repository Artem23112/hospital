import { UniqueDoctorInfoT } from "@/redux/slices/doctorSlice/serverDoctorCommunication/types";

export function getDoctorInfoById(
  list: UniqueDoctorInfoT[],
  id: string,
): UniqueDoctorInfoT | undefined {
  return list.find((doctor) => doctor.id === id);
}
