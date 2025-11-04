import {
	Boolean,
	Dictionary,
	Intersect,
	Record,
	Static,
	String,
} from 'runtypes'
import { Unique, unique } from '../../../../shared/types/main-types'
import { generalAppointment } from '../../patient-slice/types'

export type MedicalRecordT = {
	patientId: string
	fullDateISO: string
	record: string
}

export type UniqueMedicalRecordT = Unique<StoredMedicalRecordT>

export type StoredMedicalRecordT = Static<typeof storedMedicalRecord>

const storedMedicalRecord = Record({
	patientId: String,
	fullDateISO: String,
	record: String,
	doctorId: String,
})

export const storedMedicalRecordsFromServerT = Dictionary(
	storedMedicalRecord,
	String
)

//  doctor info types

export type DoctorInfoT = Static<typeof doctorInfo>
export type UniqueDoctorInfoT = Static<typeof uniqueDoctorInfo>

const doctorInfo = Record({
	name: String,
	specialization: String,
	additional: Record({
		education: String,
		experience: String,
	}),
})
export const uniqueDoctorInfo = unique(doctorInfo)
export const doctorsInfoFromServer = Dictionary(doctorInfo, String)

// doctor appointments types

export type DoctorAppointmentT = Static<typeof doctorAppointment>
export type UniqueDoctorAppointmentT = Unique<DoctorAppointmentT>
export type DoctorPatient = Static<typeof doctorPatient>

export const doctorAppointment = Intersect(
	generalAppointment,
	Record({ userId: String })
)
export const doctorAppointmentsFromServer = Dictionary(
	doctorAppointment,
	String
)

const doctorPatient = String
export const doctorPatientsFromServer = Dictionary(Boolean, String)
