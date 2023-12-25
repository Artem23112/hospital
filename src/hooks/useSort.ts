import { useEffect, useState } from 'react'
import { FiltersT } from '../components/layout/doctor-workspace/DoctorWorkspace.tsx'

export const useSort: UseSortHookT = (
	originalList,
	chosenDate,
	sortFunc,
	filterFunc
) => {
	const [date, setDate] = useState(chosenDate)
	const [filter, setFilter] = useState<FiltersT>('all')
	const [list, setList] = useState(() => sortFunc(originalList, date))

	useEffect(() => {
		if (filter === 'all') {
			setList(sortFunc(originalList, date))
			return
		}

		const newList = sortFunc(originalList, date).filter(filterFunc)
		setList(newList)
	}, [filter, date, originalList])

	return {
		sortedList: list,
		filter,
		changeChosenDate: setDate,
		changeFilter: setFilter
	}
}

type UseSortHookT = <ItemT, ArgForSortFuncT>(
	originalList: ItemT[],
	chosenDate: ArgForSortFuncT,
	sortFunc: (arg1: ItemT[], arg2: ArgForSortFuncT) => ItemT[],
	filterFunc: (elem: ItemT) => boolean
) => {
	filter: FiltersT
	sortedList: ItemT[]
	changeChosenDate: React.Dispatch<React.SetStateAction<ArgForSortFuncT>>
	changeFilter: React.Dispatch<React.SetStateAction<FiltersT>>
}
