// DOCTORS

export const DOCTORS = 'doctors/'

export const getDoctorsApiUrl = (doctorId: string = '') => {
	return `${DOCTORS}${doctorId}`
}

export const getDoctorInfoApiUrl = (doctorId: string) => {
	return `${getDoctorsApiUrl(doctorId)}/info`
}

export const getDoctorAppointmentsApiUrl = (doctorId: string) => {
	return `${DOCTORS}${doctorId}/appointments`
}

export const getDoctorAppointmentApiUrl = (
	doctorId: string,
	appointmentId: string
) => {
	return `${getDoctorAppointmentsApiUrl(doctorId)}/${appointmentId}`
}

// PATIENTS

export const PATIENTS = 'patients/'

export const getPatientsApiUrl = (patientId: string = '') => {
	return `${PATIENTS}${patientId}`
}

export const getPatientInfoApiUrl = (patientId: string) => {
	return `${getPatientsApiUrl(patientId)}/info`
}

export const getPatientsInfoApiUrl = () => {
	return `${PATIENTS}`
}

export const getPatientAppointmentsApiUrl = (patientId: string) => {
	return `${PATIENTS}${patientId}/appointments`
}

export const getPatientAppointmentApiUrl = (
	patientId: string,
	appointmentId: string
) => {
	return `${getPatientAppointmentsApiUrl(patientId)}/${appointmentId}`
}
