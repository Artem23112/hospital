import { IAuthInitialState } from '@/redux/slices/authentication-slice/types'
import { ChangeEvent, ReactNode, useState } from 'react'
import { Input } from '../Input/Input'
import s from './Form.module.scss'

type FormPropsT = {
	children?: ReactNode
	submitBtnContent: ReactNode
	submitHandler: (email: string, password: string) => void
	error: IAuthInitialState['error']
}

export const Form = ({
	children,
	submitBtnContent,
	submitHandler,
	error,
}: FormPropsT) => {
	const [email, setEmail] = useState<string>('')
	const [pw, setPw] = useState<string>('')

	const emailErr: boolean = error?.type === 'email-error'
	const pwErr: boolean = error?.type === 'pw-error'

	return (
		<form
			onSubmit={e => {
				e.preventDefault()
				submitHandler(email, pw)
			}}
		>
			{children}
			<Input
				type='email'
				value={email}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setEmail(e.target.value)
				}
				placeholder={'Логин'}
				isError={emailErr}
				errMessage={error?.message}
				required
			/>
			<Input
				type='password'
				value={pw}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setPw(e.target.value)}
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
