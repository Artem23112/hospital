import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { doctorConnectToServer } from './additionalThunks/serverDoctorCommunication/doctorConnectToServer'
import { userConnectToServer } from './additionalThunks/serverUserCommunication/userConnectToServer'
import { userSendAppointment } from './additionalThunks/serverUserCommunication/userSendAppointment'
import {
	IAppointmentsInitialState,
	UniqueDoctorAppointmentT,
	UniqueUserAppointmentT
} from './types'

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
		setUserAppointments(
			state,
			action: PayloadAction<UniqueUserAppointmentT[]>
		) {
			state.userAppointments = action.payload
		},
		setDoctorAppointments(
			state,
			action: PayloadAction<UniqueDoctorAppointmentT[]>
		) {
			state.doctorAppointments = action.payload
		},

		setBusyDates(state, action) {
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
				...action.payload
			}
		}
	},
	extraReducers: builder => {
		builder
			.addCase(userConnectToServer.fulfilled, (state, action) => {
				state.doctorsInfo = action.payload
			})
			.addCase(doctorConnectToServer.fulfilled, (state, action) => {
				state.usersInfo = action.payload
			})
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

export const {
	setUserAppointments,
	setDoctorAppointments,
	clearSubmitStatus,
	setBusyDates,
	setChosenAppointmentData
} = appointmentsSlice.actions

export default appointmentsSlice.reducer
