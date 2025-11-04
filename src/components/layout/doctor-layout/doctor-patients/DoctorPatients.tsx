import { DoctorPatientsList } from "@/components/layout/doctor-layout/doctor-patients-list/DoctorPatientsList";
import { MedicalRecordForm } from "@/components/layout/doctor-layout/medical-record-form/MedicalRecordForm";
import { type FC } from "react";
import { useParams } from "react-router-dom";
import s from "./DoctorPatients.module.scss";

type PropsT = {};

export const DoctorPatients: FC<PropsT> = ({}) => {
  const { patientId } = useParams();

  return (
    <div className={s["wrapper"]}>
      {patientId ? (
        <MedicalRecordForm patientId={patientId} />
      ) : (
        <DoctorPatientsList />
      )}
    </div>
  );
};
