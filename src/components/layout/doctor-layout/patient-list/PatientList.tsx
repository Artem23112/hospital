import { InfoCard } from '@/components/UI/info-card-compound/InfoCard'
import { UniqueDoctorAppointmentT } from '@/redux/slices/doctorSlice/serverDoctorCommunication/types'
import { uniquePatientInfo } from '@/redux/slices/patient-slice/additionalThunks/serverPatientCommunication/types'
import { useAppSelector } from '@/redux/store'
import { paginationClassNames } from '@/shared/configs/pagination-styling.config'
import { usePagination } from '@/shared/hooks/usePagination'
import { getPatientInfoById } from '@/shared/utils/functions/get/getPatientInfoById'
import clsx from 'clsx'
import { Fragment } from 'react'
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi'
import ReactPaginate from 'react-paginate'
import s from './PatientList.module.scss'

type PatientListPropsT = {
	className?: string
	doctorAppointments: UniqueDoctorAppointmentT[]
}

export const PatientList = ({
	className,
	doctorAppointments,
}: PatientListPropsT) => {
	const usersInfo = useAppSelector(state => state.doctorSlice.usersInfo)
	const countItemsOnPage = 4
	const { itemsToRender, currentPage, setCurrentPage } =
		usePagination<UniqueDoctorAppointmentT>({
			data: doctorAppointments,
			countItemsOnPage,
			page: 1,
		})
	return (
		<ul className={clsx(s['appointments-list'], className)}>
			{itemsToRender.map((item, index) => {
				const chosenUser = getPatientInfoById(usersInfo, item.userId)

				if (!uniquePatientInfo.guard(chosenUser))
					return <Fragment key={index}></Fragment>

				return (
					<li key={item.id}>
						<InfoCard>
							{item.status === 'enrolled' && (
								<InfoCard.AnswerBtns
									id={item.id}
									userId={item.userId}
								></InfoCard.AnswerBtns>
							)}
							<InfoCard.About name={chosenUser.name} />
							<InfoCard.TimeInfo fullDateISO={item.fullDateISO} />
							<InfoCard.Status status={item.status} />
						</InfoCard>
					</li>
				)
			})}
			<ReactPaginate
				forcePage={currentPage}
				pageCount={Math.ceil(doctorAppointments.length / countItemsOnPage)}
				onPageChange={event => setCurrentPage(event.selected)}
				renderOnZeroPageCount={() => (
					<p className={s['message']}>
						{!doctorAppointments.length &&
							'Нет записей за выбранную дату и сортировку'}
					</p>
				)}
				nextLabel={<BiSolidRightArrow />}
				previousLabel={<BiSolidLeftArrow />}
				{...paginationClassNames}
			/>
		</ul>
	)
}
