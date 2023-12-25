import clsx from 'clsx'
import { FC } from 'react'
import s from './TimeInfo.module.scss'

interface TimeInfoPropsI {
	className?: string
	textDate: string
	textTime: string
}
export const TimeInfo: FC<TimeInfoPropsI> = ({
	className,
	textDate,
	textTime
}) => {
	return (
		<div className={clsx(s['time'], className)}>
			<span>{textDate}</span>
			<span>{textTime}</span>
		</div>
	)
}
