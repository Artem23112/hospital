import moment from 'moment'

export const additionDateWithTime = (date: string, time: string): string => {
	const hoursAndMinutes = moment(time, 'HH:mm')
	const newDate = moment(date)
		.hours(hoursAndMinutes.hours())
		.minutes(hoursAndMinutes.minutes())
		.seconds(0)
		.milliseconds(0)
	return newDate.toISOString()
}
