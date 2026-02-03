import { useEffect, useState } from "react";

type UsePaginationArgs<DataT> = {
  page: number;
  countItemsOnPage: number;
  data: DataT[];
};

export const usePagination = <T>({
  page,
  countItemsOnPage,
  data,
}: UsePaginationArgs<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [itemsToRender, setFilterData] = useState<T[]>([]);

  useEffect(() => void setCurrentPage(0), [data.length]);
  useEffect(() => {
    setFilterData(
      data.slice(
        currentPage * countItemsOnPage,
        (currentPage + 1) * countItemsOnPage,
      ),
    );
  }, [currentPage, data, countItemsOnPage]);

  return {
    setCurrentPage,
    itemsToRender,
    currentPage,
    pageCount: Math.ceil(data.length / countItemsOnPage),
  };
};
