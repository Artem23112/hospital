import { BackButton } from "@/components/UI/buttons/back-button/BackButton";
import { GreenButton } from "@/components/UI/buttons/green-btn/GreenButton";
import { MedicalRecords } from "@/components/UI/medical-records/MedicalRecords";
import { TextEditor } from "@/components/UI/text-editor/TextEditor";
import { Loader } from "@/components/utility-components/Loader/Loader";
import { addRecordToCard } from "@/redux/slices/doctorSlice/serverDoctorCommunication/addRecordToCard";
import { getMedicalCard } from "@/redux/slices/doctorSlice/serverDoctorCommunication/getMedicalCard";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getPatientInfoById } from "@/shared/utils/functions/get/getPatientInfoById";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import s from "./MedicalRecordForm.module.scss";

type MedicalCardProps = {
  className?: string;
  patientId: string;
};

export const MedicalRecordForm: FC<MedicalCardProps> = ({ patientId }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.doctorSlice.isLoading);
  const usersInfo = useAppSelector((state) => state.doctorSlice.usersInfo);
  const [value, setValue] = useState("");
  useEffect(() => {
    dispatch(getMedicalCard(patientId));
  }, []);

  function onClick() {
    const recordInfo = {
      patientId,
      fullDateISO: moment().toISOString(),
      record: value,
    };

    setValue("");
    dispatch(addRecordToCard(recordInfo));
    dispatch(getMedicalCard(patientId));
  }

  return (
    <>
      <div>
        <BackButton className={s["back-button"]} />
        <h2 className={s["title"]}>
          <span>Пациент:</span> {getPatientInfoById(usersInfo, patientId)?.name}
        </h2>
      </div>
      <TextEditor value={value} setValue={setValue} />
      <div className={s["btn-wrapper"]}>
        <GreenButton className={s["btn"]} onClick={onClick}>
          Добавить запись
        </GreenButton>
      </div>
      {isLoading ? (
        <div className={s["loader-wrapper"]}>
          <Loader color="#006ed0" size={40} />
        </div>
      ) : (
        <MedicalRecords patientId={patientId} />
      )}
    </>
  );
};
