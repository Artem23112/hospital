import moment from 'moment-with-locales-es6'
import { useEffect, useState } from 'react'

type RangeT = {
	count: number
	what: 'hours' | 'minutes'
}

export const useParseDate = (
	fullDateISO: string | undefined,
	range: RangeT
) => {
	if (!fullDateISO) return [null, null]

	const [textDate, setTextDate] = useState<string | null>(null)
	const [textTime, setTextTime] = useState<string | null>(null)

	useEffect(() => {
		const date = moment(fullDateISO).locale('ru')
		const parsedDate = date.format('D MMMM YYYY')

		const parsedTime = `${date.format('HH:mm')} - ${date
			.add(range.count, range.what)
			.format('HH:mm')}`

		setTextDate(parsedDate)
		setTextTime(parsedTime)
	}, [fullDateISO])

	return [textDate, textTime]
}
