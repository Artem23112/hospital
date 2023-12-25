import { StatusAppointmentT } from '../../redux/slices/appointments-slice/types'

type ConvertStatusFuncT = (status: StatusAppointmentT) => string

export const convertStatusForDoctor: ConvertStatusFuncT = status => {
	const statusRuText = {
		['enrolled']: 'Записан',
		['admitted']: 'Был принят',
		['not-admitted']: 'Не принят',
		['expired']: 'Запись просрочена'
	}

	return statusRuText[status]
}

export const convertStatusForUser: ConvertStatusFuncT = status => {
	const statusRuText = {
		['enrolled']: 'Вы записаны',
		['admitted']: 'Вы были приняты',
		['not-admitted']: 'Вы не были приняты',
		['expired']: 'Запись просрочена'
	}

	return statusRuText[status]
}
