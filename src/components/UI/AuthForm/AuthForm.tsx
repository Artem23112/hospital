import clsx from 'clsx'
import { FC, ReactNode } from 'react'
import { IAuthErrorInfo } from '../../../assets/functions/getAuthErrorInfo'
import s from './AuthForm.module.scss'

interface IProps {
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

const AuthForm: FC<IProps> = ({
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
			<p className={s['err-message']}>{emailErr && error?.message}</p>
			<input
				className={clsx(s['input'], { [s['err']]: emailErr })}
				type='email'
				value={email}
				onChange={e => setEmail(e.target.value)}
				placeholder='Email'
			/>
			<p className={s['err-message']}>{pwErr && error?.message}</p>
			<input
				className={clsx(s['input'], { [s['err']]: pwErr })}
				type='password'
				value={pw}
				onChange={e => setPw(e.target.value)}
				placeholder='Пароль'
			/>
			<button className={s['btn']} type='submit'>
				{submitBtnContent}
			</button>
		</form>
	)
}

export default AuthForm
