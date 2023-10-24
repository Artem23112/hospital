import { createAsyncThunk } from '@reduxjs/toolkit'
import { getDatabase, ref, set } from 'firebase/database'
import { v4 } from 'uuid'
import { checkDuplicateAppointment } from '../../../../../assets/functions/checkDuplicateAppointment'
import { RootState } from '../../../../store'
import { showPopupMessage } from '../../../popupMessages-slice/popupMessagesSlice'
import { GeneralAppointmentT, StatusAppointmentT } from '../../types'

export const userSendAppointment = createAsyncThunk(
	'appointments/sendApplication',
	async (
		{ doctorId, fullDateISO }: SendApplicationParams,
		{ getState, dispatch, rejectWithValue }
	) => {
		const db = getDatabase()
		const state = getState() as RootState
		const userId = state.authentication.id
		const messagePattern: GeneralAppointmentT = {
			status: 'waiting' as StatusAppointmentT,
			fullDateISO
		}
		const id = v4()
		const docAppointmentPath = ref(db, `doctors/${doctorId}/appointments/${id}`)
		const userAppointmentPath = ref(db, `users/${userId}/appointments/${id}`)

		try {
			const { isExists } = await checkDuplicateAppointment(
				doctorId,
				fullDateISO
			)

			if (isExists) throw new Error('Запись на данное число уже есть')

			set(docAppointmentPath, {
				...messagePattern,
				userId
			})

			set(userAppointmentPath, {
				...messagePattern,
				doctorId
			})

			dispatch(
				showPopupMessage({
					text: 'Вы успешно записались к врачу',
					type: 'success'
				})
			)
		} catch (e) {
			const err = e as Error
			const text =
				err.message || 'Упс, что-то пошло не так, записаться не удалось'

			dispatch(showPopupMessage({ text, type: 'error' }))
			return rejectWithValue('')
		}
	}
)

type SendApplicationParams = {
	doctorId: string
	fullDateISO: string
}
