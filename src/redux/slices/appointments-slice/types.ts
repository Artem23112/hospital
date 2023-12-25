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

export interface DoctorInfoT {
	name: string
	specialization: string
	additional: {
		education: string
		experience: string
	}
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
