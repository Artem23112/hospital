import clsx from 'clsx'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import s from './TimeSelector.module.scss'
import {
	selectorChosenDate,
	selectorChosenTime,
	setChosenAppointmentData,
} from '@/redux/slices/appointments-slice/appointmentsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { ChosenTimeT } from '../date-time-picker/DateTimePicker'

type TimeSelectorPropsT = {
	from: TimeInfoT
	to: TimeInfoT
	stepSize: TimeInfoT
	busyDates: string[]
	setChosenTimeCb?: React.Dispatch<React.SetStateAction<ChosenTimeT>>
}

export const TimeSelector = ({ from, to, stepSize, busyDates }: TimeSelectorPropsT) => {
	const dispatch = useAppDispatch()
	const chosenDate = useAppSelector(selectorChosenDate)
	const chosenTime = useAppSelector(selectorChosenTime)
	const [times, setTimes] = useState<GeneratedTimeT[]>([])

	useEffect(() => {
		const timeList: GeneratedTimeT[] = []
		const startDate = moment(chosenDate)
			.hours(from.hours)
			.minutes(from.minutes)
			.seconds(0)
			.milliseconds(0)
		const endDate = moment(startDate).hours(to.hours).minutes(to.minutes)

		while (!startDate.isSameOrAfter(endDate)) {
			const generatedTime: GeneratedTimeT = {
				text: startDate.format('HH:mm'),
				isDisabled: busyDates.some(busyDate => busyDate === startDate.toISOString()),
			}

			timeList.push(generatedTime)
			startDate.add(stepSize.hours, 'hours').add(stepSize.minutes, 'minutes')
		}

		setTimes(timeList)
	}, [from, to, stepSize])

	function choosingTime(timeText: string) {
		dispatch(setChosenAppointmentData({ chosenTime: timeText }))
	}

	return (
		<div className={s['btns-wrapper']}>
			{times.map(time => {
				return (
					<button
						className={clsx(s['btn'], {
							[s['chosen']]: time.text === chosenTime,
						})}
						key={v4()}
						disabled={time.isDisabled}
						onClick={() => {
							choosingTime(time.text)
						}}
					>
						{time.text}
					</button>
				)
			})}
		</div>
	)
}

type TimeInfoT = {
	hours: number
	minutes: number
}

type GeneratedTimeT = {
	text: string
	isDisabled: boolean
}

const MemoizedAppointmentTimeSelector = React.memo(TimeSelector)
export { MemoizedAppointmentTimeSelector }
