import clsx from "clsx";
import type { FC } from "react";
import s from "./GreenButton.module.scss";

type PropsT = {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

export const GreenButton: FC<PropsT> = ({ className, children, onClick }) => {
  return (
    <button className={clsx(className, s["btn"])} onClick={onClick}>
      {children}
    </button>
  );
};
