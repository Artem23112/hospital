import moment from 'moment'
import { FC, useEffect, useMemo, useState } from 'react'
import { useAppSelector } from '../../../redux/store.ts'
import AppointmentTimeSelector from '../AppointmentTimeSelector/AppointmentTimeSelector.tsx'
import StyledCalendar from '../StyledCalendar/StyledCalendar.tsx'
import s from './DateTimePicker.module.scss'

interface IProps {
	selectedDate?: ChosenDateT
	choiceDateCb?: (arg?: unknown) => unknown | void
}
export type ChosenDateT = Date | null
export type ChosenTimeT = string | null

const Record: FC<IProps> = ({ choiceDateCb, selectedDate = null }) => {
	const [chosenDate, setChosenDate] = useState<ChosenDateT>(selectedDate)
	const [chosenTime, setChosenTime] = useState<ChosenTimeT>(null)
	const busyDates = useAppSelector(state => state.appointment.busyDates)
	const timeSelectorProps = useMemo(() => {
		return {
			from: { hours: 8, minutes: 0 },
			to: { hours: 17, minutes: 0 },
			stepSize: { hours: 0, minutes: 30 },
			busyDates,
			chosenDate
		}
	}, [busyDates, chosenDate])

	useEffect(() => {
		if (!chosenTime || !chosenDate) {
			choiceDateCb && choiceDateCb(null)
			return
		}

		const hoursAndMinutes = moment(chosenTime, 'HH:mm')
		const fullDate = moment(chosenDate)
			.hours(hoursAndMinutes.hours())
			.minutes(hoursAndMinutes.minutes())
			.seconds(0)
			.millisecond(0)
			.toDate()

		choiceDateCb && choiceDateCb(fullDate)
	}, [chosenTime, chosenDate])

	function choosingDate(curValue: ChosenDateT) {
		if (chosenDate?.toLocaleString() === curValue?.toLocaleString()) {
			setChosenDate(null)
		} else {
			setChosenDate(curValue)
		}
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
					value={chosenDate}
					onChange={v => {
						if (v instanceof Date) choosingDate(v)
					}}
					tileDisabled={({ date, view }) => {
						return (
							view === 'month' && (date.getDay() === 0 || date.getDay() === 6)
						)
					}}
				/>
				{chosenDate && (
					<AppointmentTimeSelector
						{...timeSelectorProps}
						setChosenTimeCb={setChosenTime}
					/>
				)}
			</div>
		</div>
	)
}

export default Record
