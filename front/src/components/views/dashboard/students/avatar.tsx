import { FC } from "react";
import s from "../dashboard-view.module.scss";
import clsx from "clsx";

type PropsType = {
  data: string | null;
  page?: "students" | "detail";
};

const Avatar: FC<PropsType> = ({ data, page }) => {
  if (data) {
    return (
      <img
        src={`data:image/jpg;base64,${data}`}
        alt="student avatar"
        className={
          page === "detail" ? clsx(s.avatar, s.avatarDetail) : s.avatar
        }
      />
    );
  } else {
    return (
      <img
        src="/img/avatar.svg"
        alt="student avatar"
        className={
          page === "detail" ? clsx(s.avatar, s.avatarDetail) : s.avatar
        }
      />
    );
  }
};
export default Avatar;
