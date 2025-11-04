import { Roles } from "@/shared/types/main-types";
import { IAuthErrorInfo } from "@/shared/utils/functions/get/get-auth-error-info";

export interface IAuthInitialState {
  email: string | null;
  id: string | null;
  isAuth: boolean;
  rights: Roles | null;
  loading: boolean;
  error: IAuthErrorInfo | null;
}

export type AuthInfoT = {
  email: string;
  password: string;
};

export type SignUpInfoT = { name: string } & AuthInfoT;
