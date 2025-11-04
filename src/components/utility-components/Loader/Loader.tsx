import s from "./Loader.module.scss";

type LoaderPropsT = {
  size: number;
  color: string;
};

export const Loader = ({ size, color }: LoaderPropsT) => {
  const styles = {
    width: `${size}px`,
    height: `${size}px`,
    borderWidth: `${Math.floor(size / 10)}px`,
    borderColor: color,
    borderBottomColor: "transparent",
  };

  return <span className={s["loader"]} style={styles}></span>;
};
