import { createAsyncThunk } from '@reduxjs/toolkit'

export const addNewPatient = createAsyncThunk(
	'appointments/addNewPatient',
	async (id: string) => {
		return
	}
)
