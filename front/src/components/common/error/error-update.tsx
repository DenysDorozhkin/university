import { FC } from "react";
import s from "./error.module.scss";

type PropsType = {
  message: string | null;
};

const ErrorUpdate: FC<PropsType> = ({ message }) => {
  return <div className={s.errorUpdate}>{message ? message : ""}</div>;
};

export default ErrorUpdate;
