import {
	ChosenDateT,
	ChosenTimeT
} from '../../UI/DateTimePicker/DateTimePicker'
import { DoctorValueT } from '../../UI/DoctorsList/DoctorsList'

export interface IAppointmentData {
	chosenDoctor: DoctorValueT
	chosenDate: ChosenDateT
	chosenTime: ChosenTimeT
}

export interface IManageAppointmentData extends IAppointmentData {
	changeData: React.Dispatch<React.SetStateAction<IAppointmentData>> | null
}
