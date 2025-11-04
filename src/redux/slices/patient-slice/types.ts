import { Literal, Record, Static, String, Union } from "runtypes";
import {
  UniqueDoctorInfoT,
  UniqueMedicalRecordT,
} from "../doctorSlice/serverDoctorCommunication/types";
import {
  UniquePatientAppointmentT,
  UniquePatientInfoT,
} from "./additionalThunks/serverPatientCommunication/types";

export interface IAppointmentsInitialState {
  userAppointments: UniquePatientAppointmentT[];
  doctorsInfo: UniqueDoctorInfoT[];
  usersInfo: UniquePatientInfoT[];
  isSuccessSubmit: boolean;
  busyDates: string[];
  appointmentData: {
    chosenDoctor: string | null;
    chosenDate: string | null;
    chosenTime: string | null;
  };
  medicalRecords: UniqueMedicalRecordT[];
}

export type StatusAppointmentT = Static<typeof statusAppointment>;

export type GeneralAppointmentT = Static<typeof generalAppointment>;

const statusAppointment = Union(
  Literal("enrolled"),
  Literal("admitted"),
  Literal("not-admitted"),
  Literal("expired"),
);

export const generalAppointment = Record({
  status: statusAppointment,
  fullDateISO: String,
});
