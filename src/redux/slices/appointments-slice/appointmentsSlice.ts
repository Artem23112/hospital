import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { doctorConnectToServer } from './additionalThunks/serverDoctorCommunication/doctorConnectToServer'
import {
	UniqueDoctorAppointmentT,
	UniqueDoctorInfoT
} from './additionalThunks/serverDoctorCommunication/types'
import {
	UniqueUserAppointmentT,
	UniqueUserInfoT
} from './additionalThunks/serverUserCommunication/types'
import { userConnectToServer } from './additionalThunks/serverUserCommunication/userConnectToServer'
import { userSendAppointment } from './additionalThunks/serverUserCommunication/userSendAppointment'
import { IAppointmentsInitialState } from './types'

const initialState: IAppointmentsInitialState = {
	userAppointments: [],
	doctorAppointments: [],
	doctorsInfo: [],
	usersInfo: [],
	isSuccessSubmit: false,
	busyDates: [],
	appointmentData: {
		chosenDoctor: null,
		chosenDate: null,
		chosenTime: null
	}
}

const appointmentsSlice = createSlice({
	name: 'appointments',
	initialState,
	reducers: {
		setUserAppointments(state, action: PayloadAction<UniqueUserAppointmentT[]>) {
			state.userAppointments = action.payload
		},
		setDoctorAppointments(state, action: PayloadAction<UniqueDoctorAppointmentT[]>) {
			state.doctorAppointments = action.payload
		},

		setBusyDates(state, action: PayloadAction<string[]>) {
			state.busyDates = action.payload
		},

		clearSubmitStatus(state) {
			state.isSuccessSubmit = false
		},

		setChosenAppointmentData(
			state,
			action: PayloadAction<Partial<IAppointmentsInitialState['appointmentData']>>
		) {
			state.appointmentData = {
				...state.appointmentData,
				...action.payload
			}
		}
	},
	extraReducers: builder => {
		builder
			.addCase(
				userConnectToServer.fulfilled,
				(state, action: PayloadAction<UniqueDoctorInfoT[]>) => {
					state.doctorsInfo = action.payload
				}
			)
			.addCase(
				doctorConnectToServer.fulfilled,
				(state, action: PayloadAction<UniqueUserInfoT[]>) => {
					state.usersInfo = action.payload
				}
			)
			.addCase(userSendAppointment.fulfilled, state => {
				state.isSuccessSubmit = true
				state.appointmentData = {
					chosenDoctor: null,
					chosenDate: null,
					chosenTime: null
				}
			})
	}
})

export const selectorDoctorsInfo = (state: RootState) => state.appointment.doctorsInfo
export const selectorIsSuccessSubmit = (state: RootState) => state.appointment.isSuccessSubmit
export const selectorBusyDates = (state: RootState) => state.appointment.busyDates
export const selectorChosenDate = (state: RootState) => state.appointment.appointmentData.chosenDate
export const selectorChosenTime = (state: RootState) => state.appointment.appointmentData.chosenTime

export const {
	setUserAppointments,
	setDoctorAppointments,
	clearSubmitStatus,
	setBusyDates,
	setChosenAppointmentData
} = appointmentsSlice.actions

export default appointmentsSlice.reducer
