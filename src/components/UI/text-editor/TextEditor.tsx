import type { FC } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

type PropsT = {
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
}

export const TextEditor: FC<PropsT> = ({ value, setValue }) => {
	return (
		<ReactQuill
			style={{ height: '300px' }}
			theme='snow'
			value={value}
			onChange={setValue}
		/>
	)
}
