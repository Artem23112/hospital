import { FiltersT } from "@/components/layout/doctor-layout/doctor-workspace/DoctorWorkspace";
import clsx from "clsx";
import { v4 } from "uuid";
import s from "./SortButtons.module.scss";

type SortButtonsPropsT = {
  className?: string;
  sortConfig: SortItemConfigT[];
  chosenFilter: FiltersT;
  handleClick: (filter: FiltersT) => void;
};

export const SortButtons = ({
  className,
  sortConfig,
  chosenFilter,
  handleClick,
}: SortButtonsPropsT) => {
  return (
    <ul className={clsx(s["btns-wrapper"], className)}>
      {sortConfig.map((item) => {
        return (
          <li className={s["btn-wrapper"]} key={v4()}>
            <button
              className={clsx(s["btn"], {
                [s["active"]]: chosenFilter === item.filter,
              })}
              onClick={() => {
                handleClick(item.filter);
              }}
            >
              {item.btnText}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export type SortItemConfigT = {
  filter: FiltersT;
  btnText: string;
};
