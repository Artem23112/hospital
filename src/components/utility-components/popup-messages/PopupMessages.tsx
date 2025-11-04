import { PopupMessage } from "@/components/UI/popup-message/PopupMessage";
import { useAppSelector } from "@/redux/store";
import s from "./PopupMessages.module.scss";

export const PopupMessages = () => {
  const messages = useAppSelector((state) => state.popupMessage);

  return (
    <div className={s["messages-wrapper"]}>
      {messages.map((m) => {
        return (
          <PopupMessage type={m.type} text={m.text} id={m.id} key={m.id} />
        );
      })}
    </div>
  );
};
