import { useEffect, useState } from 'react'

type UsePaginationArgs<DataT> = {
	page: number
	countItemsOnPage: number
	data: DataT[]
}

export const usePagination = <T>({
	page,
	countItemsOnPage,
	data,
}: UsePaginationArgs<T>) => {
	const [currentPage, setCurrentPage] = useState<number>(page)
	const [itemsToRender, setFilterData] = useState<T[]>([])

	useEffect(() => void setCurrentPage(0), [data])
	useEffect(() => {
		setFilterData(
			data.filter((_, index) => {
				return (
					index >= currentPage * countItemsOnPage &&
					index < (currentPage + 1) * countItemsOnPage
				)
			})
		)
	}, [currentPage, data])

	return {
		setCurrentPage,
		itemsToRender,
		currentPage,
	}
}
