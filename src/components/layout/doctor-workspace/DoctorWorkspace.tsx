import { SortButtons } from '@/components/UI/sort-buttons/SortButtons'
import {
	StyledCalendar,
	valuePiece,
} from '@/components/UI/styled-calendar/StyledCalendar'
import { useFilterAppointments } from '@/hooks/useFilterAppointments'
import { UniqueDoctorAppointmentT } from '@/redux/slices/appointments-slice/additionalThunks/serverDoctorCommunication/types'
import { StatusAppointmentT } from '@/redux/slices/appointments-slice/types'
import moment from 'moment'
import { useState } from 'react'
import { PatientList } from '../patient-list/PatientList'
import s from './DoctorWorkspace.module.scss'
import { sortConfig } from './sortConfig'

type DoctorWorkspacePropsT = {
	doctorAppointments: UniqueDoctorAppointmentT[]
}

export const DoctorWorkspace = ({
	doctorAppointments,
}: DoctorWorkspacePropsT) => {
	const [chosenDate, setChosenDate] = useState<string>(
		moment().startOf('day').toISOString()
	)
	const { handledList, chosenFilter, setChosenFilter } = useFilterAppointments<
		UniqueDoctorAppointmentT,
		FiltersT
	>(doctorAppointments, 'all', chosenDate)

	return (
		<>
			<div className={s['wrapper']}>
				<SortButtons
					className={s['sort-btns-wrapper']}
					sortConfig={sortConfig}
					chosenFilter={chosenFilter}
					handleClick={setChosenFilter}
				/>
				<PatientList
					className={s['appointment-list']}
					doctorAppointments={handledList}
				/>
				<StyledCalendar
					className={s['calendar']}
					value={moment(chosenDate).toDate()}
					onChange={v =>
						valuePiece.guard(v) && setChosenDate(moment(v).toISOString())
					}
				/>
			</div>
		</>
	)
}

export type FiltersT = StatusAppointmentT | 'all'
