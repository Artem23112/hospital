import { RootState } from '@/redux/store'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { get, getDatabase, ref, set } from 'firebase/database'

export const addToOwnPatients = createAsyncThunk(
	'appointments/addToOwnPatients',
	async (userId: string, { getState, rejectWithValue, fulfillWithValue }) => {
		const db = getDatabase()
		const state = getState() as RootState
		const doctorId = state.authentication.id
		const path = `doctors/${doctorId}/my-patients`

		const snapshot = await get(ref(db, `${path}/${userId}`))

		if (snapshot.exists()) return fulfillWithValue('already added')

		try {
			await set(ref(db, path), userId)
		} catch (error) {
			return rejectWithValue('something went wrong')
		}
	}
)
