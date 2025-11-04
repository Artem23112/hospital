import { RequireRights } from "@/components/HOC/access-restrictions/RequireRights";
import { DoctorProfile } from "@/components/layout/doctor-layout/doctor-profile/DoctorProfile";
import { PatientProfile } from "@/components/layout/patient-layout/patient-profile/PatientProfile";

const ProfilePage = () => {
  return (
    <div>
      <RequireRights requiredRights="user">
        <PatientProfile />
      </RequireRights>
      <RequireRights requiredRights="admin">
        <DoctorProfile />
      </RequireRights>
    </div>
  );
};

export { ProfilePage };
