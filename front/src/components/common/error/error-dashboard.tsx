import { FC } from "react";
import s from "./error.module.scss";

type PropsType = {
  message: string | null;
};

const ErrorDashboard: FC<PropsType> = ({ message }) => {
  return <div className={s.errorDashboard}>{message ? message : ""}</div>;
};

export default ErrorDashboard;
