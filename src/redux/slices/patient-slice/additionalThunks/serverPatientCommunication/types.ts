import { generalAppointment } from '@/redux/slices/patient-slice/types'
import { Unique, unique } from '@/shared/types/main-types'
import { Dictionary, Intersect, Record, Static, String } from 'runtypes'

// user info types

export type UserInfoT = Static<typeof userInfo>
export type UniquePatientInfoT = Static<typeof uniquePatientInfo>

const userInfo = Record({
	name: String,
})
export const uniquePatientInfo = unique(userInfo)
export const usersInfoFromServer = Dictionary(userInfo, String)

// user appointments types

export type PatientAppointmentT = Static<typeof patientAppointment>
export type UniquePatientAppointmentT = Unique<PatientAppointmentT>

const patientAppointment = Intersect(
	generalAppointment,
	Record({ doctorId: String })
)
export const patientAppointmentsFromServer = Dictionary(
	patientAppointment,
	String
)
