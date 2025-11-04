import { FiltersT } from "@/components/layout/doctor-layout/doctor-workspace/DoctorWorkspace";
import { GeneralAppointmentT } from "@/redux/slices/patient-slice/types";
import moment from "moment";
import { useEffect, useState } from "react";

export const useFilterAppointments = <
  T extends GeneralAppointmentT,
  F extends FiltersT,
>(
  list: T[],
  typeFilter: F,
  dateFilter: string,
): ReturnedType<T, F> => {
  const [chosenFilter, setChosenFilter] = useState<F>(typeFilter);
  const [handledList, setHandleList] = useState<T[]>([]);

  const filtrateByDateFilter = (item: T) => {
    return moment(item.fullDateISO).startOf("day").toISOString() === dateFilter;
  };

  useEffect(() => {
    if (chosenFilter === "all") {
      setHandleList(list.filter(filtrateByDateFilter));
    } else {
      setHandleList(
        list
          .filter((item) => item.status === chosenFilter)
          .filter(filtrateByDateFilter),
      );
    }
  }, [chosenFilter, dateFilter, list]);

  return { handledList, chosenFilter, setChosenFilter };
};

type ReturnedType<T, F> = {
  handledList: T[];
  chosenFilter: F;
  setChosenFilter: React.Dispatch<React.SetStateAction<F>>;
};
