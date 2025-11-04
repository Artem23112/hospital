import { doctorConnectToServer } from "@/redux/slices/doctorSlice/serverDoctorCommunication/doctorConnectToServer";
import { getMedicalCard } from "@/redux/slices/doctorSlice/serverDoctorCommunication/getMedicalCard";
import {
  DoctorPatient,
  UniqueDoctorAppointmentT,
  UniqueDoctorInfoT,
  UniqueMedicalRecordT,
} from "@/redux/slices/doctorSlice/serverDoctorCommunication/types";
import { UniquePatientInfoT } from "@/redux/slices/patient-slice/additionalThunks/serverPatientCommunication/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type IS = {
  appointments: UniqueDoctorAppointmentT[];
  usersInfo: UniquePatientInfoT[];
  doctorsInfo: UniqueDoctorInfoT[];
  doctorPatients: DoctorPatient[];
  medicalCard: UniqueMedicalRecordT[];
  isLoading: boolean;
};

const initialState: IS = {
  appointments: [],
  usersInfo: [],
  doctorsInfo: [],
  doctorPatients: [],
  medicalCard: [],
  isLoading: false,
};

const doctorSlice = createSlice({
  name: "doctorSlice",
  initialState,
  reducers: {
    setDoctorAppointments(
      state,
      action: PayloadAction<UniqueDoctorAppointmentT[]>,
    ) {
      state.appointments = action.payload;
    },
    setDoctorPatients(state, action: PayloadAction<DoctorPatient[]>) {
      state.doctorPatients = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        doctorConnectToServer.fulfilled,
        (
          state,
          action: PayloadAction<{
            usersInfo: UniquePatientInfoT[];
            doctorsInfo: UniqueDoctorInfoT[];
          }>,
        ) => {
          state.usersInfo = action.payload.usersInfo;
          state.doctorsInfo = action.payload.doctorsInfo;
        },
      )
      .addCase(getMedicalCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getMedicalCard.fulfilled,
        (state, action: PayloadAction<UniqueMedicalRecordT[]>) => {
          state.medicalCard = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(getMedicalCard.rejected, (state) => {
        state.medicalCard = [];
        state.isLoading = false;
      });
  },
});

export const { setDoctorAppointments, setDoctorPatients } = doctorSlice.actions;
export default doctorSlice.reducer;
