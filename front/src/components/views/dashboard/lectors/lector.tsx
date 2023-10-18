import { FC } from "react";
import s from "../dashboard-view.module.scss";
import { ILector } from "../../../../services/lectors/lector.interface";
import EditIcon from "../edit-icon";
import { Link } from "react-router-dom";
import { Routes } from "../../../../utils/constants/routes.constant";
import clsx from "clsx";

type PropsType = {
  lector: ILector;
};

const Lector: FC<PropsType> = ({ lector }) => {
  return (
    <div className={s.entity} key={lector.id}>
      <div>
        <p>{lector.name ? lector.name : "-"}</p>
      </div>
      <div>
        <p>{lector.email}</p>
      </div>
      <div>
        <p>{"*".repeat(6)}</p>
      </div>
      <Link
        to={`${Routes.LECTORS_ROUTE}/update/${lector.id}`}
        className={clsx(s.update, s.update__big)}
      >
        <EditIcon />
      </Link>
    </div>
  );
};

export default Lector;
