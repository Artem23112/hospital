import { AuthErrorCodes } from 'firebase/auth'

export interface IAuthErrorInfo {
	code: AuthErrorCode | null
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
				code: errorCode,
				type: 'email-error',
				message: 'Неверный формат email.'
			}
		case AuthErrorCodes.EMAIL_EXISTS:
			return {
				code: errorCode,
				type: 'email-error',
				message: 'Email уже используется другим пользователем.'
			}
		case AuthErrorCodes.USER_DELETED:
			return {
				code: errorCode,
				type: 'email-error',
				message: 'Пользователь с указанным email не найден.'
			}
		case AuthErrorCodes.USER_DISABLED:
			return {
				code: errorCode,
				type: 'email-error',
				message: 'Учетная запись пользователя отключена.'
			}

		// PASSWORD ERROR
		case AuthErrorCodes.WEAK_PASSWORD:
			return {
				code: errorCode,
				type: 'pw-error',
				message: 'Слабый пароль.'
			}
		case AuthErrorCodes.INVALID_PASSWORD:
			return {
				code: errorCode,
				type: 'pw-error',
				message: 'Неверный пароль.'
			}

		// ERRORS
		case AuthErrorCodes.NETWORK_REQUEST_FAILED:
			return {
				code: errorCode,
				type: 'error',
				message: 'Кажется какие-то проблемы с сетью.'
			}
		case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
			return {
				code: errorCode,
				type: 'error',
				message: 'Сервер слишком нагружен, попробуйте позже.'
			}

		case null:
			return {
				code: null,
				type: null,
				message: null
			}

		default:
			return {
				code: errorCode,
				type: 'error',
				message: 'Извините произошла какая-то ошибка, перезагрузите страницу'
			}
	}
}
