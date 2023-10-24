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
	busyDates: []
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
			})
	}
})

export const {
	setUserAppointments,
	setDoctorAppointments,
	clearSubmitStatus,
	setBusyDates
} = appointmentsSlice.actions

export default appointmentsSlice.reducer
