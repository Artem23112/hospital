import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 } from 'uuid'
import { InitialStateT, PopupMessageT, UniquePopupMessageT } from './types'

const initialState: InitialStateT = []

const popupMessagesSlice = createSlice({
	name: 'popup-messages',
	initialState,
	reducers: {
		addMessage(state, action: PayloadAction<UniquePopupMessageT>) {
			state.push(action.payload)
		},
		removeMessage(state, action: PayloadAction<UniquePopupMessageT['id']>) {
			return state.filter(message => message.id !== action.payload)
		}
	}
})

export const showPopupMessage = createAsyncThunk(
	'popup-messages/show',
	async (message: PopupMessageT, { dispatch }) => {
		const uniqueMessage: UniquePopupMessageT = { ...message, id: v4() }
		dispatch(addMessage(uniqueMessage))

		await new Promise(resolve => {
			if (uniqueMessage?.duration === 0) return

			setTimeout(() => {
				dispatch(removeMessage(uniqueMessage.id))
				resolve('success')
			}, uniqueMessage?.duration || 3000)
		})
	}
)

export const { addMessage, removeMessage } = popupMessagesSlice.actions

export default popupMessagesSlice.reducer
