import { IAuthErrorInfo } from '../../../assets/functions/get-auth-error-info'

export interface IAuthInitialState {
	email: string | null
	id: string | null
	isAuth: boolean
	rights: 'admin' | 'user' | null
	loading: boolean
	error: IAuthErrorInfo | null
}

// export interface IAuthPayload {

// }

export type AuthInfoT = {
	email: string
	password: string
}

export type SignUpInfoT = { name: string } & AuthInfoT
