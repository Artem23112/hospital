import clsx from 'clsx'
import s from './Input.module.scss'

type InputPropsT = {
	className?: string
	type: string
	value?: string
	onChange?: (value: string) => void
	placeholder: string
	isError?: boolean
	errMessage?: string | null
	required?: boolean
}

export const Input = ({
	className,
	type,
	value,
	onChange,
	placeholder,
	isError,
	errMessage,
	required
}: InputPropsT) => {
	return (
		<label>
			{isError && <span className={s['err-message']}>{errMessage}</span>}
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
