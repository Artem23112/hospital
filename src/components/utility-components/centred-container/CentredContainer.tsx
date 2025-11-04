import clsx from "clsx";
import s from "./CentredContainer.module.scss";

type CentredContainerPropsT = {
  children: React.ReactNode;
  className?: string;
};

export const CentredContainer = ({
  children,
  className,
}: CentredContainerPropsT) => {
  return <div className={clsx(s["container"], className)}>{children}</div>;
};
