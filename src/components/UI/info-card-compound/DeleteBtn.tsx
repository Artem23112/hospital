import closeImg from "@/assets/images/icons/close.svg";
import { deleteAppointment } from "@/redux/slices/patient-slice/additionalThunks/deleteAppointment";
import { useAppDispatch } from "@/redux/store";
import { FC } from "react";
import s from "./index.module.scss";

type DeleteBtnPropsT = {
  id: string;
};

export const DeleteBtn: FC<DeleteBtnPropsT> = ({ id }) => {
  const dispatch = useAppDispatch();
  return (
    <button
      className={s["btn-delete"]}
      onClick={() => {
        dispatch(deleteAppointment(id));
      }}
    >
      <img src={closeImg} />
    </button>
  );
};
