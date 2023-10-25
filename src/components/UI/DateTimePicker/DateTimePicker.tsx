import moment from 'moment'
import { useMemo } from 'react'
import { setChosenAppointmentData } from '../../../redux/slices/appointments-slice/appointmentsSlice.ts'
import { IAppointmentsInitialState } from '../../../redux/slices/appointments-slice/types.ts'
import { useAppDispatch, useAppSelector } from '../../../redux/store.ts'
import StyledCalendar, { Value } from '../StyledCalendar/StyledCalendar.tsx'
import TimeSelector from '../TimeSelector/TimeSelector.tsx'
import s from './DateTimePicker.module.scss'

export type ChosenDateT = Date | null
export type ChosenTimeT = string | null

const DateTimePicker = () => {
	const dispatch = useAppDispatch()
	const { busyDates, chosenDate } = useAppSelector<SelectedT>(state => {
		return {
			busyDates: state.appointment.busyDates,
			chosenDate: state.appointment.appointmentData.chosenDate
		}
	})
	const timeSelectorProps = useMemo(() => {
		return {
			from: { hours: 8, minutes: 0 },
			to: { hours: 17, minutes: 0 },
			stepSize: { hours: 0, minutes: 30 },
			busyDates,
			chosenDate
		}
	}, [busyDates, chosenDate])

	function choosingDate(v: Value) {
		if (!(v instanceof Date)) return
		dispatch(setChosenAppointmentData({ chosenDate: v.toISOString() }))
	}

	return (
		<div>
			<h2 className={s['title']}>Выберите дату и время</h2>
			<div className={s['content-container']}>
				<StyledCalendar
					className={s['record-calendar']}
					maxDate={moment().add(1, 'month').toDate()}
					minDate={moment().toDate()}
					maxDetail={'month'}
					minDetail={'year'}
					value={chosenDate && moment(chosenDate).toDate()}
					onChange={v => {
						choosingDate(v)
					}}
					tileDisabled={({ date, view }) => {
						return (
							view === 'month' && (date.getDay() === 0 || date.getDay() === 6)
						)
					}}
				/>
				{chosenDate && <TimeSelector {...timeSelectorProps} />}
			</div>
		</div>
	)
}

type SelectedT = {
	busyDates: IAppointmentsInitialState['busyDates']
	chosenDate: IAppointmentsInitialState['appointmentData']['chosenDate']
}

export default DateTimePicker
