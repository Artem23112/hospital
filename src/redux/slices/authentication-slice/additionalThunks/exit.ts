import { getAuthErrorInfo } from '@/shared/utils/functions/get/get-auth-error-info'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { FirebaseError } from 'firebase/app'
import { getAuth, signOut } from 'firebase/auth'

export const exit = createAsyncThunk(
	'authentication/exit',
	async (_, { rejectWithValue }) => {
		try {
			await signOut(getAuth())
		} catch (err) {
			const firebaseErr = err as FirebaseError
			return rejectWithValue({ ...getAuthErrorInfo(firebaseErr.code) })
		}
	}
)
