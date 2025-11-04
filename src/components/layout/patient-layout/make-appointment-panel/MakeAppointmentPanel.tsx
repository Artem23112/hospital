import { GreenButton } from "@/components/UI/buttons/green-btn/GreenButton";
import { DateTimePicker } from "@/components/UI/date-time-picker/DateTimePicker";
import { DoctorsList } from "@/components/UI/doctor-list/DoctorsList";
import { patientSendAppointment } from "@/redux/slices/patient-slice/additionalThunks/serverPatientCommunication/patientSendAppointment";
import {
  clearSubmitStatus,
  selectorDoctorsInfo,
  selectorIsSuccessSubmit,
} from "@/redux/slices/patient-slice/patientSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { PATHS } from "@/shared/constants/paths";
import clsx from "clsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import s from "./MakeAppointmentPanel.module.scss";

export const MakeAppointmentPanel = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const doctorsInfo = useAppSelector(selectorDoctorsInfo);
  const isSuccessSubmit = useAppSelector(selectorIsSuccessSubmit);

  useEffect(() => {
    if (!isSuccessSubmit) return;
    navigate(PATHS.profile.home + PATHS.profile.appointmentList);
    dispatch(clearSubmitStatus());
  }, [isSuccessSubmit]);

  return (
    <>
      <div className={s["content-wrapper"]}>
        <DoctorsList doctorsInfo={doctorsInfo} />
        <DateTimePicker />
        <GreenButton
          className={clsx(s["end"])}
          onClick={() => {
            dispatch(patientSendAppointment());
          }}
        >
          Записаться
        </GreenButton>
      </div>
    </>
  );
};
