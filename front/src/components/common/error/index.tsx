import { FC } from "react";
import s from "./error.module.scss";

type PropsType = {
  message: string | null;
};

const Error: FC<PropsType> = ({ message }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.error}>{message ? message : ""}</div>
    </div>
  );
};

export default Error;
