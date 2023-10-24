import clsx from 'clsx'
import moment from 'moment'
import React, { FC, useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { ChosenTimeT } from '../DateTimePicker/DateTimePicker'
import s from './AppointmentTimeSelector.module.scss'

interface IProps {
	from: TimeInfoT
	to: TimeInfoT
	stepSize: TimeInfoT
	chosenDate: Date | null
	busyDates: string[]
	setChosenTimeCb?: React.Dispatch<React.SetStateAction<ChosenTimeT>>
}

const AppointmentTimeSelector: FC<IProps> = ({
	from,
	to,
	stepSize,
	chosenDate,
	busyDates,
	setChosenTimeCb
}) => {
	const [times, setTimes] = useState<GeneratedTimeT[]>([])
	const [chosenBtn, setChosenBtn] = useState<number | null>(null)

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
				isDisabled: busyDates.some(
					busyDate => busyDate === startDate.toISOString()
				)
			}

			timeList.push(generatedTime)
			startDate.add(stepSize.hours, 'hours').add(stepSize.minutes, 'minutes')
		}

		setTimes(timeList)
	}, [from, to, stepSize])

	function choosingTime(i: number) {
		if (i === chosenBtn) {
			setChosenBtn(null)
			setChosenTimeCb && setChosenTimeCb(null)
		} else {
			setChosenBtn(i)
			setChosenTimeCb && setChosenTimeCb(times[i].text)
		}
	}

	return (
		<div className={s['btns-wrapper']}>
			{times.map((time, i) => {
				return (
					<button
						className={clsx(s['btn'], { [s['chosen']]: i === chosenBtn })}
						key={v4()}
						disabled={time.isDisabled}
						onClick={() => {
							choosingTime(i)
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

const MemoizedAppointmentTimeSelector = React.memo(AppointmentTimeSelector)
export default MemoizedAppointmentTimeSelector
