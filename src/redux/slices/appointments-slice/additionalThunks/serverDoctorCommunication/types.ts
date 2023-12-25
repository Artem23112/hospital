import { GeneralAppointmentT } from '../../types'

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
