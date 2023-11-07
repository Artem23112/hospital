import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAuth, signOut } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { getAuthErrorInfo } from '../../../../assets/functions/get-auth-error-info'

export const exit = createAsyncThunk(
	'authentication/exit',
	async (_, { rejectWithValue }) => {
		try {
			signOut(getAuth())
		} catch (err) {
			const firebaseErr = err as FirebaseError
			return rejectWithValue({ ...getAuthErrorInfo(firebaseErr.code) })
		}
	}
)
