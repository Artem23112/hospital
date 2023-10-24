import { FC, useState } from 'react'
import { v4 } from 'uuid'
import { UniqueDoctorInfoT } from '../../../redux/slices/appointments-slice/types'
import InfoButton from '../InfoButton/InfoButton'
import s from './DoctorsList.module.scss'

interface IProps {
	doctorsInfo: UniqueDoctorInfoT[]
	selectedDoctor?: DoctorValueT
	choiceDoctorCb?: (arg?: unknown) => void
}

const DoctorsList: FC<IProps> = ({
	doctorsInfo,
	choiceDoctorCb,
	selectedDoctor = null
}) => {
	const [chosenDoctor, setChosenDoctor] = useState<DoctorValueT>(selectedDoctor)

	function choosingDoctor(id: string) {
		if (chosenDoctor === id) {
			setChosenDoctor(null)
			choiceDoctorCb && choiceDoctorCb(null)
		} else {
			setChosenDoctor(id)
			choiceDoctorCb && choiceDoctorCb(id)
		}
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
