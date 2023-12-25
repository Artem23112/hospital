import {
	UniqueDoctorAppointmentT,
	UniqueDoctorInfoT
} from './additionalThunks/serverDoctorCommunication/types'
import {
	UniqueUserAppointmentT,
	UniqueUserInfoT
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

export type StatusAppointmentT =
	| 'enrolled'
	| 'admitted'
	| 'not-admitted'
	| 'expired'

export interface GeneralAppointmentT {
	status: StatusAppointmentT
	fullDateISO: string
}
