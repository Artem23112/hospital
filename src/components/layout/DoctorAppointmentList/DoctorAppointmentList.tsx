import moment from 'moment'
import { FC, useEffect, useState } from 'react'
import { useSort } from '../../../hooks/useSort'
import {
	StatusAppointmentT,
	UniqueDoctorAppointmentT
} from '../../../redux/slices/appointments-slice/types'
import SortButtons, { SortItemConfigT } from '../../UI/SortButtons/SortButtons'
import StyledCalendar from '../../UI/StyledCalendar/StyledCalendar'
import AppointmentList from '../AppointmentList/AppointmentList'
import s from './DoctorAppointmentList.module.scss'
import { selectAppointmentsForDate } from '../../../assets/functions/sortingHelper'

interface IProps {
	doctorAppointments: UniqueDoctorAppointmentT[]
}

const DoctorAppointmentList: FC<IProps> = ({ doctorAppointments }) => {
	const [chosenDate, setChosenDate] = useState<Date>(
		moment().startOf('day').toDate()
	)
	const { filter, sortedList, changeChosenDate, changeFilter } = useSort<
		UniqueDoctorAppointmentT,
		Date
	>(doctorAppointments, chosenDate, selectAppointmentsForDate, filterFunc)

	useEffect(() => {
		changeChosenDate(chosenDate)
	}, [chosenDate])

	function filterFunc(item: UniqueDoctorAppointmentT): boolean {
		return item.status === filter
	}

	const sortConfig: SortItemConfigT[] = [
		{
			filter: 'all',
			btnText: 'Все'
		},
		{
			filter: 'accepted',
			btnText: 'Принятые'
		},
		{
			filter: 'canceled',
			btnText: 'Отклоненные'
		},
		{
			filter: 'waiting',
			btnText: 'В ожидании'
		}
	]

	return (
		<>
			<div className={s['wrapper']}>
				<SortButtons
					className={s['sort-btns-wrapper']}
					sortConfig={sortConfig}
					chosenFilter={filter}
					handleClick={changeFilter}
				/>
				<AppointmentList
					className={s['appointment-list']}
					doctorAppointments={sortedList}
				/>
				<StyledCalendar
					className={s['calendar']}
					value={chosenDate}
					onChange={v => setChosenDate(v as Date)}
				/>
			</div>
		</>
	)
}

export type FiltersT = StatusAppointmentT | 'all'

export default DoctorAppointmentList
