import { GeneralAppointmentT } from '../../types'

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
