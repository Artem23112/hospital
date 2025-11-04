import { useAppSelector } from "@/redux/store";
import { Roles } from "@/shared/types/main-types";
import { ReactNode } from "react";

interface IRequireRightsProps {
  requiredRights: Roles;
  children: ReactNode;
}

export const RequireRights = ({
  requiredRights,
  children,
}: IRequireRightsProps) => {
  const currentRights = useAppSelector((state) => state.authentication.rights);
  return <>{requiredRights === currentRights && <>{children}</>}</>;
};
