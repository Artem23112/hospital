import { createSlice } from '@reduxjs/toolkit'
import { connectToServer } from './additionalThunks/connectToServer'
import { exit } from './additionalThunks/exit'
import { signIn } from './additionalThunks/signIn'
import { signUp } from './additionalThunks/signUp'
import { IAuthInitialState } from './types'

const initialState: IAuthInitialState = {
	email: null,
	id: null,
	isAuth: false,
	rights: null,
	loading: false,
	error: null
}

export const authenticationSlice = createSlice({
	name: 'authentication',
	initialState,
	reducers: {
		setSavedUser(state, action) {
			const { email, id, isAuth } = action.payload
			state.error = null
			state.email = email
			state.id = id
			state.isAuth = isAuth
		},
		clearError(state) {
			state.error = null
		}
	},
	extraReducers: builder => {
		builder
			.addCase(signUp.fulfilled, (state, action) => {
				const { email, id } = action.payload
				state.email = email
				state.id = id
				state.isAuth = true
				state.loading = false
				state.error = null
			})
			.addCase(signIn.fulfilled, (state, action) => {
				const { email, id } = action.payload
				state.email = email
				state.id = id
				state.isAuth = true
				state.loading = false
				state.error = null
			})
			.addCase(exit.fulfilled, state => {
				state.email = null
				state.id = null
				state.isAuth = false
				state.rights = null
				state.loading = false
				state.error = null
			})
			.addCase(connectToServer.fulfilled, (state, action) => {
				state.rights = action.payload
			})
			.addMatcher(
				action => {
					return (
						action.type === signUp.pending.type ||
						action.type === signIn.pending.type ||
						action.type === exit.pending.type
					)
				},
				state => {
					state.loading = true
				}
			)
			.addMatcher(
				action => {
					return (
						action.type === signUp.rejected.type ||
						action.type === signIn.rejected.type ||
						action.type === exit.rejected.type ||
						action.type === connectToServer.rejected.type
					)
				},
				(state, action) => {
					state.error = action.payload.error
					state.loading = false
				}
			)
	}
})

export const { setSavedUser, clearError } = authenticationSlice.actions

export default authenticationSlice.reducer
