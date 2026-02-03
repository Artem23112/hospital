import { Tabs } from "@/components/UI/tabs/Tabs";
import { DoctorPatients } from "@/components/layout/doctor-layout/doctor-patients/DoctorPatients";
import { useAppSelector } from "@/redux/store";
import { PATHS } from "@/shared/constants/paths";
import { Navigate } from "react-router-dom";
import { CentredContainer } from "../../../utility-components/centred-container/CentredContainer";
import { Header } from "../../header/Header";
import { DoctorWorkspace } from "../doctor-workspace/DoctorWorkspace";

export const DoctorProfile = () => {
  const doctorAppointments = useAppSelector(
    (state) => state.doctorSlice.appointments,
  );

  const tabsConfig = [
    {
      id: 1,
      tabText: "Список записей",
      linkPath: `${PATHS.profile.home}${PATHS.profile.appointmentList}`,
      routePath: `${PATHS.profile.appointmentList}`,
      component: <DoctorWorkspace doctorAppointments={doctorAppointments} />,
    },
    {
      id: 2,
      tabText: "Мои пациенты",
      linkPath: `${PATHS.profile.home}${PATHS.profile.myPatients}`,
      routePath: `${PATHS.profile.myPatients}:patientId?`,
      component: <DoctorPatients />,
    },
    {
      id: 3,
      linkPath: "",
      routePath: `${PATHS.home}`,
      component: <Navigate to={`./${PATHS.profile.appointmentList}`} />,
      default: true,
    },
  ];

  return (
    <>
      <Header title="Добро пожаловать" />
      <CentredContainer>
        <Tabs tabsConfig={tabsConfig} />
      </CentredContainer>
    </>
  );
};
