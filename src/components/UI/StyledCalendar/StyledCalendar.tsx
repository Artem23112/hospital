import Calendar, { CalendarProps } from 'react-calendar'
import './StyledCalendar.scss'

type StyledCalendarPropsT = CalendarProps & React.RefAttributes<unknown>

export const StyledCalendar = (props: StyledCalendarPropsT) => (
	<Calendar className={'react-calendar'} {...props} />
)

export type ValuePiece = Date | null

export type Value = ValuePiece | [ValuePiece, ValuePiece]
