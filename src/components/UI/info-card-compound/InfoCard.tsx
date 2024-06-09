import clsx from 'clsx'
import { FC, ReactNode } from 'react'
import { About } from './About'
import { DeleteBtn } from './DeleteBtn'
import { Status } from './Status'
import { TimeInfo } from './TimeInfo'
import s from './index.module.scss'
import { AnswerBtns } from '@/components/UI/info-card-compound/AnswerBtns'

type InfoCardPropsT = {
	children: ReactNode
	active?: boolean
	handleClick?: () => void
}
export const InfoCard: FC<InfoCardPropsT> & InfoCardSiblings = ({
	children,
	active,
	handleClick,
}) => {
	return (
		<div
			className={clsx(s['wrapper'], {
				[s['active']]: active,
			})}
			style={{ cursor: active == false || active == true ? 'pointer' : '' }}
			onClick={() => handleClick?.()}
		>
			{children}
		</div>
	)
}

InfoCard.About = About
InfoCard.TimeInfo = TimeInfo
InfoCard.DeleteBtn = DeleteBtn
InfoCard.Status = Status
InfoCard.AnswerBtns = AnswerBtns

type InfoCardSiblings = {
	About: typeof About
	TimeInfo: typeof TimeInfo
	DeleteBtn: typeof DeleteBtn
	Status: typeof Status
	AnswerBtns: typeof AnswerBtns
}
