import { StatusAppointmentT } from '../../redux/slices/appointments-slice/types'

type ConvertStatusFuncT = (status: StatusAppointmentT) => string

export const convertStatus: ConvertStatusFuncT = status => {
	const statusRuText = {
		['waiting']: 'Ожидание',
		['accepted']: 'Принята',
		['canceled']: 'Отклонена'
	}

	return statusRuText[status]
}
