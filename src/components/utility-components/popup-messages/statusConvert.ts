export const statusConvert: StatusConvertT = {
	error: 'Ошибка',
	success: 'Успех',
	warning: 'Предупреждение',
	information: 'Информация'
}
type StatusConvertT = {
	[key: string]: string
}
