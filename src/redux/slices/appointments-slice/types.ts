export interface IAppointmentsInitialState {
	userAppointments: UniqueUserAppointmentT[]
	doctorAppointments: UniqueDoctorAppointmentT[]
	doctorsInfo: UniqueDoctorInfoT[]
	usersInfo: UniqueUserInfoT[]
	isSuccessSubmit: boolean
	busyDates: string[]
}

export type StatusAppointmentT = 'waiting' | 'accepted' | 'canceled'

export interface GeneralAppointmentT {
	status: StatusAppointmentT
	fullDateISO: string
}

export interface DoctorInfoT {
	name: string
	specialization: string
}
export interface UniqueDoctorInfoT extends DoctorInfoT {
	id: string
}

export interface DoctorAppointmentT extends GeneralAppointmentT {
	userId: string
}
export interface UniqueDoctorAppointmentT extends DoctorAppointmentT {
	id: string
}

export interface UserInfoT {
	name: string
}
export interface UniqueUserInfoT extends UserInfoT {
	id: string
}

export interface UserAppointmentT extends GeneralAppointmentT {
	doctorId: string
}
export interface UniqueUserAppointmentT extends UserAppointmentT {
	id: string
}
