import { AuthErrorCodes } from 'firebase/auth'

export interface IAuthErrorInfo {
	type: TError | null
	message: string | null
}

export type AuthErrorCode = (typeof AuthErrorCodes)[keyof typeof AuthErrorCodes]
export type TError = 'email-error' | 'pw-error' | 'error'

export const getAuthErrorInfo = (errorCode: AuthErrorCode): IAuthErrorInfo => {
	switch (errorCode) {
		// EMAIL ERROR
		case AuthErrorCodes.INVALID_EMAIL:
			return {
				type: 'email-error',
				message: 'Неверный формат email.'
			}
		case AuthErrorCodes.EMAIL_EXISTS:
			return {
				type: 'email-error',
				message: 'Email уже используется другим пользователем.'
			}
		case AuthErrorCodes.USER_DELETED:
			return {
				type: 'email-error',
				message: 'Пользователь с указанным email не найден.'
			}
		case AuthErrorCodes.USER_DISABLED:
			return {
				type: 'email-error',
				message: 'Учетная запись пользователя отключена.'
			}

		// PASSWORD ERROR
		case AuthErrorCodes.WEAK_PASSWORD:
			return {
				type: 'pw-error',
				message: 'Слабый пароль.'
			}
		case AuthErrorCodes.INVALID_PASSWORD:
			return {
				type: 'pw-error',
				message: 'Неверный пароль.'
			}

		// ERRORS
		case AuthErrorCodes.NETWORK_REQUEST_FAILED:
			return {
				type: 'error',
				message: 'Кажется какие-то проблемы с сетью.'
			}
		case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
			return {
				type: 'error',
				message: 'Сервер слишком нагружен, попробуйте позже.'
			}

		case null:
			return {
				type: null,
				message: null
			}

		default:
			return {
				type: 'error',
				message: 'Извините произошла какая-то ошибка, перезагрузите страницу'
			}
	}
}
