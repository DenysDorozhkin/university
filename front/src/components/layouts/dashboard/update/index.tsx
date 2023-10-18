import { FC, ReactElement } from "react";
import s from "./sign-layout.module.scss";

type PropsType = {
  children: ReactElement;
};

const UpdateLayout: FC<PropsType> = ({ children }) => {
  return (
    <main className={s.page}>
      <div className={s.top}>
        <img src="/img/update-logo.svg" alt="logo" className={s.logo} />
        <img src="/img/avatar.svg" alt="avatar" />
      </div>
      {children}
    </main>
  );
};

export default UpdateLayout;
