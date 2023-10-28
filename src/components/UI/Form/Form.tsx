import { FC, ReactNode, useState } from 'react'
import { IAuthInitialState } from '../../../redux/slices/authentication-slice/types'
import { Input } from '../Input/Input'
import s from './Form.module.scss'

interface IAuthFormProps {
	children?: ReactNode
	submitBtnContent: ReactNode
	submitHandler: (email: string, password: string) => void
	error: IAuthInitialState['error']
}

export const Form: FC<IAuthFormProps> = ({
	children,
	submitBtnContent,
	submitHandler,
	error
}) => {
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
