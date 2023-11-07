import { getAllBusyDatesISO } from './get-all-busy-dates-ISO'

type CheckDuplicateAppointmentFuncT = (
	doctorId: string,
	fullDateISO: string
) => Promise<{ isExists: boolean }>

export const checkDuplicateAppointment: CheckDuplicateAppointmentFuncT = async (
	doctorId,
	fullDateISO
) => {
	const busyDatesISO = await getAllBusyDatesISO(doctorId)

	const isExists = busyDatesISO.some(date => {
		return date === fullDateISO
	})

	return { isExists }
}
