import { Link } from "react-router-dom";
import s from "./AlternativeChoice.module.scss";

type AlternativeChoiceT = {
  contentText: string;
  linkText: string;
  redirectPath: string;
  handleClick: () => void;
};

export const AlternativeChoice = ({
  contentText,
  linkText,
  redirectPath,
  handleClick,
}: AlternativeChoiceT) => {
  return (
    <p className={s["wrapper"]}>
      {contentText}
      <Link to={redirectPath} onClick={handleClick}>
        {linkText}
      </Link>
    </p>
  );
};
