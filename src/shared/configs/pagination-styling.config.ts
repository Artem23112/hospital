import s from '@/assets/scss/pagination.module.scss'
import clsx from 'clsx'

export const paginationClassNames = {
	activeClassName: s['active'],
	disabledClassName: s['disabled'],
	containerClassName: s['container'],
	pageClassName: s['number'],
	previousClassName: clsx(s['arrow-btn'], s['prev-btn']),
	nextClassName: clsx(s['arrow-btn'], s['next-btn']),
}
