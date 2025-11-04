import { InfoCard } from '@/components/UI/info-card-compound/InfoCard'
import { uniqueDoctorInfo } from '@/redux/slices/doctorSlice/serverDoctorCommunication/types'
import { UniquePatientAppointmentT } from '@/redux/slices/patient-slice/additionalThunks/serverPatientCommunication/types'
import { selectorDoctorsInfo } from '@/redux/slices/patient-slice/patientSlice'
import { useAppSelector } from '@/redux/store'
import { paginationClassNames } from '@/shared/configs/pagination-styling.config'
import { usePagination } from '@/shared/hooks/usePagination'
import clsx from 'clsx'
import { Fragment } from 'react'
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi'
import ReactPaginate from 'react-paginate'
import s from './PatientAppointmentList.module.scss'

type PatientAppointmentListPropsT = {
	className?: string
	userAppointments: UniquePatientAppointmentT[]
}

export const PatientAppointmentList = ({
	className,
	userAppointments,
}: PatientAppointmentListPropsT) => {
	const doctorsInfo = useAppSelector(selectorDoctorsInfo)
	const countItemsOnPage = 5
	const { itemsToRender, setCurrentPage } =
		usePagination<UniquePatientAppointmentT>({
			page: 0,
			countItemsOnPage,
			data: userAppointments,
		})

	return (
		<>
			<ul className={clsx(s['appointments-list'], className)}>
				{itemsToRender.map(item => {
					const chosenDoc = doctorsInfo.find(
						doctor => doctor.id === item.doctorId
					)
					if (!uniqueDoctorInfo.guard(chosenDoc))
						return <Fragment key={item.id}></Fragment>

					return (
						<li key={item.id}>
							<InfoCard>
								<InfoCard.About
									name={chosenDoc.name}
									specialization={chosenDoc.specialization}
								/>
								<InfoCard.TimeInfo fullDateISO={item.fullDateISO} />
								<InfoCard.Status status={item.status} />
								<InfoCard.DeleteBtn id={item.id} />
							</InfoCard>
						</li>
					)
				})}
			</ul>
			<ReactPaginate
				pageCount={Math.ceil(userAppointments.length / countItemsOnPage)}
				onPageChange={event => setCurrentPage(event.selected)}
				renderOnZeroPageCount={null}
				nextLabel={<BiSolidRightArrow />}
				previousLabel={<BiSolidLeftArrow />}
				{...paginationClassNames}
			/>
			{!userAppointments.length && (
				<p className={s['message']}>'У вас нет никаких записей'</p>
			)}
		</>
	)
}
