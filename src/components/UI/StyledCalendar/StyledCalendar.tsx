import { FC } from 'react'
import Calendar, { CalendarProps } from 'react-calendar'
import './StyledCalendar.scss'

type StyledCalendarPropsT = CalendarProps & React.RefAttributes<unknown>

const StyledCalendar: FC<StyledCalendarPropsT> = props => (
	<Calendar className={'react-calendar'} {...props} />
)

export type ValuePiece = Date | null

export type Value = ValuePiece | [ValuePiece, ValuePiece]

export default StyledCalendar
