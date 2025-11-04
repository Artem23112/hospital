import { FC } from "react";
import s from "./index.module.scss";
import clsx from "clsx";

type AboutPropsT = {
  className?: string;
  name: string;
  specialization?: string;
};

export const About: FC<AboutPropsT> = ({ className, name, specialization }) => {
  return (
    <span className={clsx(className)}>
      <h4 className={s["title"]}>{name}</h4>
      {specialization && <p className={s["additional"]}>{specialization}</p>}
    </span>
  );
};
