import calendarIcon from '@/assets/images/icons/calendar.svg'
import clockIcon from '@/assets/images/icons/time.svg'
import { useParseDate } from '@/shared/hooks/useParseDate'
import clsx from 'clsx'
import { FC } from 'react'
import s from './index.module.scss'

type TimeInfoPropsT = {
	className?: string
	fullDateISO?: string
	textDate?: string
	textTime?: string
}
export const TimeInfo: FC<TimeInfoPropsT> = ({
	className,
	fullDateISO,
	textDate,
	textTime,
}) => {
	const [parsedDate, parsedTime] = useParseDate(fullDateISO, {
		count: 30,
		what: 'minutes',
	})

	return (
		<div className={clsx(s['time'], className)}>
			<div>
				<span>
					<img className={s['icon']} src={calendarIcon} />
					{parsedDate || textDate}
				</span>
				<span>
					<img className={s['icon']} src={clockIcon} />
					{parsedTime || textTime}
				</span>
			</div>
		</div>
	)
}
