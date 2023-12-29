import { additionDateWithTime } from '@/assets/functions/addition-date-with-time'
import { checkDuplicateAppointment } from '@/assets/functions/check-duplicate-appointment'
import { showPopupMessage } from '@/redux/slices/popupMessages-slice/popupMessagesSlice'
import { RootState } from '@/redux/store'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getDatabase, ref, set } from 'firebase/database'
import { v4 } from 'uuid'
import { GeneralAppointmentT } from '../../types'

export const userSendAppointment = createAsyncThunk(
	'appointments/sendApplication',
	async (_, { getState, dispatch, rejectWithValue }) => {
		const state = getState() as RootState
		const {
			chosenDoctor: doctorId,
			chosenDate,
			chosenTime,
		} = state.appointment.appointmentData
		if (!doctorId || !chosenDate || !chosenTime) {
			dispatch(
				showPopupMessage({
					text: 'Извините, но вы выбрали не все, что необходимо для записи',
					type: 'warning',
				})
			)
			return rejectWithValue('Данных недостаточно')
		}

		const db = getDatabase()
		const fullDateISO = additionDateWithTime(chosenDate, chosenTime)
		const userId = state.authentication.id
		const messagePattern: GeneralAppointmentT = {
			status: 'enrolled',
			fullDateISO,
		}

		const id = v4()
		const docAppointmentPath = ref(db, `doctors/${doctorId}/appointments/${id}`)
		const userAppointmentPath = ref(db, `users/${userId}/appointments/${id}`)

		try {
			const { isExists } = await checkDuplicateAppointment(doctorId, fullDateISO)

			if (isExists) throw new Error('Запись на данное число уже есть')

			set(docAppointmentPath, {
				...messagePattern,
				userId,
			})

			set(userAppointmentPath, {
				...messagePattern,
				doctorId,
			})

			dispatch(
				showPopupMessage({
					text: 'Вы записались к врачу',
					type: 'success',
				})
			)
		} catch (e) {
			const err = e as Error
			const text = err.message || 'Упс, что-то пошло не так, записаться не удалось'

			dispatch(showPopupMessage({ text, type: 'error' }))
			return rejectWithValue('')
		}
	}
)
