import { UniquePatientInfoT } from "@/redux/slices/patient-slice/additionalThunks/serverPatientCommunication/types";
import { getPatientInfoById } from "@/shared/utils/functions/get/getPatientInfoById";
import { useEffect, useState } from "react";

export const useSearch = <DataT extends string>({
  data,
  patientsInfo,
}: {
  data: DataT[];
  patientsInfo: UniquePatientInfoT[];
}) => {
  const [searchName, setSearchName] = useState<string>("");
  const [filteredData, setFilteredData] = useState<DataT[]>([]);
  useEffect(() => {
    setFilteredData(
      data.filter((item) => {
        const patientInfo = getPatientInfoById(patientsInfo, item);
        const lowerName = patientInfo?.name?.toLowerCase();
        const lowerSearchName = searchName.toLowerCase();
        return lowerName?.includes(lowerSearchName);
      }),
    );
  }, [searchName, data, patientsInfo]);

  return {
    setSearchName,
    filteredData,
    searchName,
  };
};
