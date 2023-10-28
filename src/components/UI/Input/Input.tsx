import clsx from 'clsx'
import { FC } from 'react'
import s from './Input.module.scss'

interface IInputProps {
	className?: string
	type: string
	value?: string
	onChange?: (value: string) => void
	placeholder: string
	isError?: boolean
	errMessage?: string | null
	required?: boolean
}

export const Input: FC<IInputProps> = ({
	className,
	type,
	value,
	onChange,
	placeholder,
	isError,
	errMessage,
	required
}) => {
	return (
		<label>
			<span>{isError && errMessage}</span>
			<input
				className={clsx(s['input'], { [s['err']]: isError }, className)}
				type={type}
				value={value}
				placeholder={placeholder}
				onChange={e => onChange?.(e.target.value)}
				required={required}
			/>
		</label>
	)
}
