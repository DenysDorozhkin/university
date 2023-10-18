import { FC } from "react";
import s from "./error.module.scss";

type PropsType = {
  message: string | null;
};

const ErrorModal: FC<PropsType> = ({ message }) => {
  return <div className={s.errorModal}>{message ? message : ""}</div>;
};

export default ErrorModal;
