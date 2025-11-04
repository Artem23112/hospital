import { MedicalRecord } from "@/components/UI/medical-records/MedicalRecord";
import { useAppSelector } from "@/redux/store";
import { getDoctorInfoById } from "@/shared/utils/functions/get/getDoctorInfoById";
import type { FC } from "react";
import s from "./PatientMedicalCard.module.scss";

type PropsT = {};

export const PatientMedicalCard: FC<PropsT> = ({}) => {
  const medicalRecords = useAppSelector(
    (state) => state.patientSlice.medicalRecords,
  );
  const doctorsInfo = useAppSelector((state) => state.patientSlice.doctorsInfo);

  return (
    <div className={s["wrapper"]}>
      {!!medicalRecords.length ? (
        medicalRecords.map((record) => (
          <MedicalRecord
            key={record.id}
            record={record}
            doctorInfo={getDoctorInfoById(doctorsInfo, record.doctorId)}
          />
        ))
      ) : (
        <p className={s["message"]}>У вас нет записей в медицинской карте</p>
      )}
    </div>
  );
};
