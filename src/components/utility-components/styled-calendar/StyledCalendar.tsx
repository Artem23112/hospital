import Calendar, { CalendarProps } from "react-calendar";
import { InstanceOf, Null, Static, Union } from "runtypes";
import "./StyledCalendar.scss";

type StyledCalendarPropsT = CalendarProps & React.RefAttributes<unknown>;

export const StyledCalendar = (props: StyledCalendarPropsT) => (
  <Calendar className={"react-calendar"} {...props} />
);

type ValuePiece = Static<typeof valuePiece>;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export const valuePiece = Union(InstanceOf(Date), Null);
