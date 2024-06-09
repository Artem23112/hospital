import { IAuthErrorInfo } from '@/assets/functions/get-auth-error-info'
import { Roles } from '@/main-types'

export interface IAuthInitialState {
	email: string | null
	id: string | null
	isAuth: boolean
	rights: Roles | null
	loading: boolean
	error: IAuthErrorInfo | null
	doctorPatients: string[]
}

export type AuthInfoT = {
	email: string
	password: string
}

export type SignUpInfoT = { name: string } & AuthInfoT
