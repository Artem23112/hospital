import { FC, ReactNode } from 'react'
import { IAuthErrorInfo } from '../../../assets/functions/getAuthErrorInfo'
import s from './AuthForm.module.scss'
import Input from './Input/Input'

interface IAuthFormProps {
	children?: ReactNode
	email: string
	pw: string
	setEmail: React.Dispatch<React.SetStateAction<string>>
	setPw: React.Dispatch<React.SetStateAction<string>>
	submitBtnContent: ReactNode
	submitHandler: () => void
	error: {
		type: IAuthErrorInfo['type']
		message: IAuthErrorInfo['message']
	} | null
}

const AuthForm: FC<IAuthFormProps> = ({
	children,
	email,
	pw,
	setEmail,
	setPw,
	submitBtnContent,
	submitHandler,
	error
}) => {
	const emailErr: boolean = error?.type === 'email-error'
	const pwErr: boolean = error?.type === 'pw-error'

	return (
		<form
			onSubmit={e => {
				e.preventDefault()
				submitHandler()
			}}
		>
			{children}
			<Input
				type='email'
				value={email}
				onChange={setEmail}
				placeholder={'Логин'}
				isError={emailErr}
				errMessage={error?.message}
				required
			/>
			<Input
				type='password'
				value={pw}
				onChange={setPw}
				placeholder={'Пароль'}
				isError={pwErr}
				errMessage={error?.message}
				required
			/>
			<button className={s['btn']} type='submit'>
				{submitBtnContent}
			</button>
		</form>
	)
}

export default AuthForm
