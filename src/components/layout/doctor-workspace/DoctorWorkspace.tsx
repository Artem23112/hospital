import moment from 'moment'
import { useState } from 'react'
import { useFilterAppointments } from '../../../hooks/useFilterAppointments'
import { UniqueDoctorAppointmentT } from '../../../redux/slices/appointments-slice/additionalThunks/serverDoctorCommunication/types'
import { StatusAppointmentT } from '../../../redux/slices/appointments-slice/types'
import { SortButtons, SortItemConfigT } from '../../UI/sort-buttons/SortButtons'
import { StyledCalendar, valuePiece } from '../../UI/styled-calendar/StyledCalendar'
import { PatientList } from '../patient-list/PatientList'
import s from './DoctorWorkspace.module.scss'

type DoctorWorkspacePropsT = {
	doctorAppointments: UniqueDoctorAppointmentT[]
}

export const DoctorWorkspace = ({ doctorAppointments }: DoctorWorkspacePropsT) => {
	const [chosenDate, setChosenDate] = useState<string>(moment().startOf('day').toISOString())
	const [filteredList, filter, setFilter] = useFilterAppointments<
		UniqueDoctorAppointmentT,
		FiltersT
	>(doctorAppointments, 'all', chosenDate)

	const sortConfig: SortItemConfigT[] = [
		{
			filter: 'all',
			btnText: 'Все',
		},
		{
			filter: 'enrolled',
			btnText: 'Записанные',
		},
		{
			filter: 'admitted',
			btnText: 'Принятые',
		},
		{
			filter: 'not-admitted',
			btnText: 'Не принятые',
		},
		{ filter: 'expired', btnText: 'Просроченные' },
	]

	return (
		<>
			<div className={s['wrapper']}>
				<SortButtons
					className={s['sort-btns-wrapper']}
					sortConfig={sortConfig}
					chosenFilter={filter}
					handleClick={setFilter}
				/>
				<PatientList className={s['appointment-list']} doctorAppointments={filteredList} />
				<StyledCalendar
					className={s['calendar']}
					value={moment(chosenDate).toDate()}
					onChange={v => valuePiece.guard(v) && setChosenDate(moment(v).toISOString())}
				/>
			</div>
		</>
	)
}

export type FiltersT = StatusAppointmentT | 'all'
