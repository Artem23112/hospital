import { InfoCard } from "@/components/UI/info-card-compound/InfoCard";
import { UniqueDoctorAppointmentT } from "@/redux/slices/doctorSlice/serverDoctorCommunication/types";
import { uniquePatientInfo } from "@/redux/slices/patient-slice/additionalThunks/serverPatientCommunication/types";
import { useAppSelector } from "@/redux/store";
import { paginationClassNames } from "@/shared/configs/pagination-styling.config";
import { usePagination } from "@/shared/hooks/usePagination";
import { getPatientInfoById } from "@/shared/utils/functions/get/getPatientInfoById";
import clsx from "clsx";
import { Fragment, useMemo } from "react";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import ReactPaginate from "react-paginate";
import s from "./PatientList.module.scss";

type PatientListPropsT = {
  className?: string;
  doctorAppointments: UniqueDoctorAppointmentT[];
};

export const PatientList = ({
  className,
  doctorAppointments,
}: PatientListPropsT) => {
  const usersInfo = useAppSelector((state) => state.doctorSlice.usersInfo);
  const countItemsOnPage = 4;

  const validAppointments = useMemo(() => {
    return doctorAppointments.filter((item) => {
      const user = getPatientInfoById(usersInfo, item.userId);
      return uniquePatientInfo.guard(user);
    });
  }, [doctorAppointments, usersInfo]);

  const { itemsToRender, currentPage, setCurrentPage } =
    usePagination<UniqueDoctorAppointmentT>({
      data: validAppointments,
      countItemsOnPage,
      page: 0,
    });
  const pageCount = Math.ceil(doctorAppointments.length / countItemsOnPage);

  return (
    <ul className={clsx(s["appointments-list"], className)}>
      {itemsToRender.map((item, index) => {
        const chosenUser = getPatientInfoById(usersInfo, item.userId);

        if (!uniquePatientInfo.guard(chosenUser))
          return <Fragment key={index}></Fragment>;

        return (
          <li key={item.id}>
            <InfoCard>
              {item.status === "enrolled" && (
                <InfoCard.AnswerBtns
                  id={item.id}
                  userId={item.userId}
                ></InfoCard.AnswerBtns>
              )}
              <InfoCard.About name={chosenUser.name} />
              <InfoCard.TimeInfo fullDateISO={item.fullDateISO} />
              <InfoCard.Status status={item.status} />
            </InfoCard>
          </li>
        );
      })}
      {validAppointments.length > countItemsOnPage && (
        <ReactPaginate
          forcePage={currentPage}
          pageCount={pageCount}
          onPageChange={(event) => setCurrentPage(event.selected)}
          nextLabel={<BiSolidRightArrow />}
          previousLabel={<BiSolidLeftArrow />}
          {...paginationClassNames}
        />
      )}
    </ul>
  );
};
