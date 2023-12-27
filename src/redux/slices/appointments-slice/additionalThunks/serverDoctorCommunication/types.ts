import { Dictionary, Intersect, Record, Static, String } from 'runtypes'
import { Unique } from '../../../../../main-types'
import { generalAppointment } from '../../types'

//  doctor info types

export type DoctorInfoT = Static<typeof doctorInfo>
export type UniqueDoctorInfoT = Unique<DoctorInfoT>

const doctorInfo = Record({
	name: String,
	specialization: String,
	additional: Record({
		education: String,
		experience: String
	})
})
export const doctorsInfoFromServer = Dictionary(doctorInfo, String)

// doctor appointments types

export type DoctorAppointmentT = Static<typeof doctorAppointment>
export type UniqueDoctorAppointmentT = Unique<DoctorAppointmentT>

export const doctorAppointment = Intersect(generalAppointment, Record({ userId: String }))
export const doctorAppointmentsFromServer = Dictionary(doctorAppointment, String)
