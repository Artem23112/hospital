export interface IAppointmentsInitialState {
	userAppointments: UniqueUserAppointmentT[]
	doctorAppointments: UniqueDoctorAppointmentT[]
	doctorsInfo: UniqueDoctorInfoT[]
	usersInfo: UniqueUserInfoT[]
	isSuccessSubmit: boolean
	busyDates: string[]
}

export type GeneralAppointmentT = {
	status: StatusAppointmentT
	fullDateISO: string
}

export type DoctorInfoT = {
	name: string
	specialization: string
}
export type UniqueDoctorInfoT = DoctorInfoT & { id: string }

export type DoctorAppointmentT = GeneralAppointmentT & {
	userId: string
}
export type UniqueDoctorAppointmentT = DoctorAppointmentT & {
	id: string
}

export type UserInfoT = {
	name: string
}
export type UniqueUserInfoT = UserInfoT & { id: string }

export type UserAppointmentT = GeneralAppointmentT & {
	doctorId: string
}
export type UniqueUserAppointmentT = UserAppointmentT & {
	id: string
}

export type StatusAppointmentT = 'waiting' | 'accepted' | 'canceled'

export type NotificationType = {
	status: StatusAppointmentT
	date: string
	userID?: string
}

export type NotificationListType = {
	[key: string]: NotificationType
}
