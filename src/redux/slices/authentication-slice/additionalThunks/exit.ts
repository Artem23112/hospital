import { createAsyncThunk } from '@reduxjs/toolkit'
import { signOut, getAuth } from 'firebase/auth'
import { getAuthErrorInfo } from '../../../../assets/functions/getAuthErrorInfo'

export const exit = createAsyncThunk(
	'authentication/exit',
	async (_, { rejectWithValue }) => {
		try {
			signOut(getAuth())
		} catch (err: any) {
			return rejectWithValue({ ...getAuthErrorInfo(err.code), error: err.code })
		}
	}
)
