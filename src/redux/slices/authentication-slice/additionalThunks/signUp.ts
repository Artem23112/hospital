import { createAsyncThunk } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { getDatabase, ref, set } from 'firebase/database'
import { getAuthErrorInfo } from '../../../../assets/functions/get-auth-error-info'
import { userConnectToServer } from '../../appointments-slice/additionalThunks/serverUserCommunication/userConnectToServer'
import { SignUpInfoT } from '../types'

export const signUp = createAsyncThunk(
	'authentication/signUp',
	async (
		{ email, password, name }: SignUpInfoT,
		{ rejectWithValue, dispatch }
	) => {
		try {
			const { user } = await createUserWithEmailAndPassword(
				getAuth(),
				email,
				password
			)
			const id = user.uid

			await set(ref(getDatabase(), `users-info/${id}/rights`), 'user')
			await set(ref(getDatabase(), `users-info/${id}/name`), name)

			dispatch(userConnectToServer(id))

			return {
				email: user.email,
				id
			}
		} catch (err: any) {
			return rejectWithValue({
				error: { ...getAuthErrorInfo(err.code), page: '/signup' }
			})
		}
	}
)
