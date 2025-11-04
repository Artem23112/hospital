import { getMedicalCard } from '@/redux/slices/patient-slice/additionalThunks/serverPatientCommunication/getMedicalCard'
import { RootState } from '@/redux/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UniqueDoctorInfoT } from '../doctorSlice/serverDoctorCommunication/types'
import { patientConnectToServer } from './additionalThunks/serverPatientCommunication/patientConnectToServer'
import { patientSendAppointment } from './additionalThunks/serverPatientCommunication/patientSendAppointment'
import { UniquePatientAppointmentT } from './additionalThunks/serverPatientCommunication/types'
import { IAppointmentsInitialState } from './types'

const initialState: IAppointmentsInitialState = {
	userAppointments: [],
	doctorsInfo: [],
	usersInfo: [],
	isSuccessSubmit: false,
	busyDates: [],
	appointmentData: {
		chosenDoctor: null,
		chosenDate: null,
		chosenTime: null,
	},
	medicalRecords: [],
}

const patientSlice = createSlice({
	name: 'patientSlice',
	initialState,
	reducers: {
		setPatientAppointments(
			state,
			action: PayloadAction<UniquePatientAppointmentT[]>
		) {
			state.userAppointments = action.payload
		},

		setBusyDates(state, action: PayloadAction<string[]>) {
			state.busyDates = action.payload
		},

		clearSubmitStatus(state) {
			state.isSuccessSubmit = false
		},

		setChosenAppointmentData(
			state,
			action: PayloadAction<
				Partial<IAppointmentsInitialState['appointmentData']>
			>
		) {
			state.appointmentData = {
				...state.appointmentData,
				...action.payload,
			}
		},
	},
	extraReducers: builder => {
		builder
			.addCase(
				patientConnectToServer.fulfilled,
				(state, action: PayloadAction<UniqueDoctorInfoT[]>) => {
					state.doctorsInfo = action.payload
				}
			)
			.addCase(patientSendAppointment.fulfilled, state => {
				state.isSuccessSubmit = true
				state.appointmentData = {
					chosenDoctor: null,
					chosenDate: null,
					chosenTime: null,
				}
			})
			.addCase(getMedicalCard.fulfilled, (state, action) => {
				state.medicalRecords = action.payload
			})
	},
})

export const selectorDoctorsInfo = (state: RootState) =>
	state.patientSlice.doctorsInfo
export const selectorIsSuccessSubmit = (state: RootState) =>
	state.patientSlice.isSuccessSubmit
export const selectorBusyDates = (state: RootState) =>
	state.patientSlice.busyDates
export const selectorChosenDoctor = (state: RootState) =>
	state.patientSlice.appointmentData.chosenDoctor
export const selectorChosenDate = (state: RootState) =>
	state.patientSlice.appointmentData.chosenDate
export const selectorChosenTime = (state: RootState) =>
	state.patientSlice.appointmentData.chosenTime

export const {
	setPatientAppointments,
	clearSubmitStatus,
	setBusyDates,
	setChosenAppointmentData,
} = patientSlice.actions

export default patientSlice.reducer
