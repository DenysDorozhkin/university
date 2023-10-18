import { FC } from "react";
import s from "./header.module.scss";
import { headerTitleEnum } from "../../layouts/dashboard/enums/dashboard-layouts.enum";
import { useAuth } from "../../../redux/hooks/useAuth";
import Loader from "../loader";

type PropsType = {
  title: headerTitleEnum;
};

const Header: FC<PropsType> = ({ title }) => {
  const { isLoading } = useAuth();

  return (
    <header className={s.header}>
      <h1>
        {title}
        {isLoading ? <Loader component={"header"} /> : ""}
      </h1>
      <img src="/img/avatar.svg" alt="avatar" />
    </header>
  );
};

export default Header;
