import clsx from 'clsx'
import s from './TimeInfo.module.scss'

type TimeInfoPropsT = {
	className?: string
	textDate: string
	textTime: string
}
export const TimeInfo = ({ className, textDate, textTime }: TimeInfoPropsT) => {
	return (
		<div className={clsx(s['time'], className)}>
			<span>{textDate}</span>
			<span>{textTime}</span>
		</div>
	)
}
