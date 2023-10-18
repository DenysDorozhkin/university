import { FC, ReactElement } from "react";
import s from "./sign-layout.module.scss";
import { ISignLayout } from "./sign-layout.interface";
import { useAuth } from "../../../redux/hooks/useAuth";
import Loader from "../../common/loader";
import Error from "../../common/error";

type PropsType = {
  layoutElements: ISignLayout;
  children: ReactElement;
};

const SignLayout: FC<PropsType> = ({ layoutElements, children }) => {
  const { error: userError, isLoading } = useAuth();

  return (
    <main className={s.page}>
      <img src="/img/logo.svg" alt="logo" className={s.logo} />
      <h1 className={s.title}>
        {layoutElements.title}
        {isLoading ? <Loader component={"sign"} /> : ""}
      </h1>
      {children}
      <Error message={userError} />
    </main>
  );
};

export default SignLayout;
