import { SortButtons } from "@/components/UI/buttons/sort-buttons/SortButtons";
import {
  StyledCalendar,
  valuePiece,
} from "@/components/utility-components/styled-calendar/StyledCalendar";
import { UniqueDoctorAppointmentT } from "@/redux/slices/doctorSlice/serverDoctorCommunication/types";
import { StatusAppointmentT } from "@/redux/slices/patient-slice/types";
import { useFilterAppointments } from "@/shared/hooks/useFilterAppointments";
import moment from "moment";
import { useState } from "react";
import { PatientList } from "../patient-list/PatientList";
import s from "./DoctorWorkspace.module.scss";
import { sortConfig } from "./sortConfig";

type DoctorWorkspacePropsT = {
  doctorAppointments: UniqueDoctorAppointmentT[];
};

export const DoctorWorkspace = ({
  doctorAppointments,
}: DoctorWorkspacePropsT) => {
  const [chosenDate, setChosenDate] = useState<string>(
    moment().startOf("day").toISOString(),
  );
  const { handledList, chosenFilter, setChosenFilter } = useFilterAppointments<
    UniqueDoctorAppointmentT,
    FiltersT
  >(doctorAppointments, "all", chosenDate);

  return (
    <>
      <div className={s["wrapper"]}>
        <SortButtons
          className={s["sort-btns-wrapper"]}
          sortConfig={sortConfig}
          chosenFilter={chosenFilter}
          handleClick={setChosenFilter}
        />
        <PatientList
          key={handledList.length}
          className={s["appointment-list"]}
          doctorAppointments={handledList}
        />
        <StyledCalendar
          className={s["calendar"]}
          value={moment(chosenDate).toDate()}
          onChange={(v) =>
            valuePiece.guard(v) && setChosenDate(moment(v).toISOString())
          }
        />
      </div>
    </>
  );
};

export type FiltersT = StatusAppointmentT | "all";
