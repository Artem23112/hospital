import { useAppSelector } from "@/redux/store";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type RequireAuthPropsT = {
  children: ReactNode;
};

export const RequireAuth = ({ children }: RequireAuthPropsT) => {
  const isAuth = useAppSelector((state) => state.authentication.isAuth);

  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }
  return <>{children}</>;
};
