import { FC } from 'react'
import Calendar, { CalendarProps } from 'react-calendar'
import './StyledCalendar.scss'

type PropsT = CalendarProps & React.RefAttributes<unknown>

const StyledCalendar: FC<PropsT> = props => (
	<Calendar className={'react-calendar'} {...props} />
)

export type ValuePiece = Date | null

export type Value = ValuePiece | [ValuePiece, ValuePiece]

export default StyledCalendar
