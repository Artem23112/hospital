import { Literal, Record, Static, String, Union } from 'runtypes'
import {
	UniqueDoctorAppointmentT,
	UniqueDoctorInfoT,
} from './additionalThunks/serverDoctorCommunication/types'
import {
	UniqueUserAppointmentT,
	UniqueUserInfoT,
} from './additionalThunks/serverUserCommunication/types'

export interface IAppointmentsInitialState {
	userAppointments: UniqueUserAppointmentT[]
	doctorAppointments: UniqueDoctorAppointmentT[]
	doctorsInfo: UniqueDoctorInfoT[]
	usersInfo: UniqueUserInfoT[]
	isSuccessSubmit: boolean
	busyDates: string[]
	appointmentData: {
		chosenDoctor: string | null
		chosenDate: string | null
		chosenTime: string | null
	}
}

export type StatusAppointmentT = Static<typeof statusAppointment>

export type GeneralAppointmentT = Static<typeof generalAppointment>

const statusAppointment = Union(
	Literal('enrolled'),
	Literal('admitted'),
	Literal('not-admitted'),
	Literal('expired')
)

export const generalAppointment = Record({
	status: statusAppointment,
	fullDateISO: String,
})
