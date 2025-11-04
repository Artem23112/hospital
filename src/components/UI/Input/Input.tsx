import clsx from "clsx";
import { HTMLProps } from "react";
import s from "./Input.module.scss";

type InputPropsT = {
  className?: string;
  isError?: boolean;
  errMessage?: string | null;
} & HTMLProps<HTMLInputElement>;

export const Input = ({
  className,
  isError,
  errMessage,
  ...props
}: InputPropsT) => {
  return (
    <label>
      {isError && <span className={s["err-message"]}>{errMessage}</span>}
      <input
        className={clsx(s["input"], { [s["err"]]: isError }, className)}
        {...props}
      />
    </label>
  );
};
