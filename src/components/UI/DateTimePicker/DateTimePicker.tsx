import moment from 'moment'
import { useContext, useMemo } from 'react'
import { useAppSelector } from '../../../redux/store.ts'
import { ManageAppointmentData } from '../../layout/MakeAppointmentPanel/MakeAppointmentPanel.tsx'
import TimeSelector from '../TimeSelector/TimeSelector.tsx'
import StyledCalendar from '../StyledCalendar/StyledCalendar.tsx'
import s from './DateTimePicker.module.scss'

export type ChosenDateT = Date | null
export type ChosenTimeT = string | null

const DateTimePicker = () => {
	const appointmentData = useContext(ManageAppointmentData)
	const { chosenDate, changeData } = appointmentData
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

	function choosingDate(curValue: ChosenDateT) {
		changeData &&
			changeData({
				...appointmentData,
				chosenDate:
					chosenDate?.toLocaleString() !== curValue?.toLocaleString()
						? curValue
						: null
			})
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
				{chosenDate && <TimeSelector {...timeSelectorProps} />}
			</div>
		</div>
	)
}

export default DateTimePicker
