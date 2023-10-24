import { FC, useContext } from 'react'
import { v4 } from 'uuid'
import { UniqueDoctorInfoT } from '../../../redux/slices/appointments-slice/types'
import { ManageAppointmentData } from '../../layout/MakeAppointmentPanel/MakeAppointmentPanel'
import InfoButton from '../InfoButton/InfoButton'
import s from './DoctorsList.module.scss'

interface IDoctorsListProps {
	doctorsInfo: UniqueDoctorInfoT[]
}

const DoctorsList: FC<IDoctorsListProps> = ({ doctorsInfo }) => {
	const appointmentData = useContext(ManageAppointmentData)
	const { chosenDoctor, changeData } = appointmentData

	function choosingDoctor(id: string) {
		changeData &&
			changeData({
				...appointmentData,
				chosenDoctor: chosenDoctor !== id ? id : null
			})
	}

	return (
		<div>
			<h2 className={s['title']}>Выберите врача</h2>
			<ul className={s['doctor-list']}>
				{doctorsInfo.map(info => {
					return (
						<li key={v4()}>
							<InfoButton
								id={info.id}
								info={info}
								isSelected={chosenDoctor === info.id}
								handleClick={choosingDoctor}
							/>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export type DoctorValueT = string | null

export default DoctorsList
