import { createAsyncThunk } from '@reduxjs/toolkit'
import { getDatabase, ref, remove } from 'firebase/database'
import { RootState } from '../../../store'
import { showPopupMessage } from '../../popupMessages-slice/popupMessagesSlice'

export const deleteAppointment = createAsyncThunk(
	'appointments',
	async (id: string, { getState, dispatch }) => {
		const state = getState() as RootState
		const userId = state.authentication.id
		const rights = state.authentication.rights
		const path = ref(
			getDatabase(),
			`${rights === 'admin' ? 'doctors' : 'users'}/${userId}/appointments/${id}`
		)

		try {
			await remove(path)
		} catch (error) {
			dispatch(
				showPopupMessage({ text: 'Не удалось удалить запись', type: 'error' })
			)
		}
	}
)
