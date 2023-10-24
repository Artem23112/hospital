import { IAuthErrorInfo } from '../../../assets/functions/getAuthErrorInfo'

export interface IAuthInitialState {
	email: string | null
	id: string | null
	isAuth: boolean
	rights: 'admin' | 'user' | null
	loading: boolean
	error: IAuthErrorInfo | null
}

export interface IAuthPayload {
	email: string
	id: string
}
