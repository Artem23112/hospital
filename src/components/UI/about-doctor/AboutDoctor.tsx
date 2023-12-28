import clsx from 'clsx'
import { useRef } from 'react'
import { UniqueDoctorInfoT } from '../../../redux/slices/appointments-slice/additionalThunks/serverDoctorCommunication/types'
import { TimeInfo } from '../../UI/time-info/TimeInfo'
import s from './AboutDoctor.module.scss'

type AboutDoctorPropsT = {
	info: UniqueDoctorInfoT
	isSelected?: boolean
	handleClick?: (id: string) => void
}

export const AboutDoctor = ({ info, isSelected, handleClick }: AboutDoctorPropsT) => {
	const ulRef = useRef<HTMLUListElement>(null)

	return (
		<div className={s['wrapper']}>
			<button
				className={clsx(s['btn'], {
					[s['active']]: isSelected
				})}
				onClick={() => {
					handleClick?.(info.id)
				}}
			>
				<div>
					<h4 className={s['title']}>{info.name}</h4>
					<p className={s['specialization']}>{info.specialization}</p>
				</div>
				<TimeInfo className={s['time']} textDate='Пн - Сб' textTime='8:00 - 17:00' />
			</button>
			<div
				className={clsx(s['additional-wrapper'], { [s['active']]: isSelected })}
				style={{
					maxHeight: isSelected ? `${ulRef.current?.clientHeight}px` : ''
				}}
			>
				<ul className={s['additional-list']} ref={ulRef}>
					{Object.values(info.additional).map((val, i) => {
						return (
							<li className='additional-item' key={i}>
								{val}
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}
