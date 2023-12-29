import moment from 'moment'
import { useMemo } from 'react'
import {
	selectorBusyDates,
	selectorChosenDate,
	setChosenAppointmentData,
} from '../../../redux/slices/appointments-slice/appointmentsSlice.ts'
import { useAppDispatch, useAppSelector } from '../../../redux/store.ts'
import { MemoizedAppointmentTimeSelector as TimeSelector } from '../time-selector/TimeSelector.tsx'
import { StyledCalendar, Value } from '../styled-calendar/StyledCalendar.tsx'
import s from './DateTimePicker.module.scss'

export type ChosenDateT = Date | null
export type ChosenTimeT = string | null

export const DateTimePicker = () => {
	const dispatch = useAppDispatch()
	const busyDates = useAppSelector(selectorBusyDates)
	const chosenDate = useAppSelector(selectorChosenDate)
	const timeSelectorProps = useMemo(() => {
		return {
			from: { hours: 8, minutes: 0 },
			to: { hours: 17, minutes: 0 },
			stepSize: { hours: 0, minutes: 30 },
			busyDates,
			chosenDate,
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
					minDate={moment().add(1, 'day').toDate()}
					maxDetail={'month'}
					minDetail={'year'}
					value={chosenDate && moment(chosenDate).toDate()}
					onChange={v => {
						choosingDate(v)
					}}
					tileDisabled={({ date, view }) => {
						return view === 'month' && (date.getDay() === 0 || date.getDay() === 6)
					}}
				/>
				{chosenDate && <TimeSelector {...timeSelectorProps} />}
			</div>
		</div>
	)
}
