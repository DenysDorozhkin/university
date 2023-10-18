import { FC } from "react";
import s from "../dashboard-view.module.scss";
import EditIcon from "../edit-icon";
import { IGroup } from "../../../../services/groups/group.interface";
import { Link } from "react-router-dom";
import { Routes } from "../../../../utils/constants/routes.constant";
import clsx from "clsx";

type PropsType = {
  group: IGroup;
};

const Group: FC<PropsType> = ({ group }) => {
  return (
    <div className={s.entity} key={group.id}>
      <div>
        <p>{group.name}</p>
      </div>
      <Link
        to={`${Routes.GROUPS_ROUTE}/update/${group.id}`}
        className={clsx(s.update, s.update__big)}
      >
        <EditIcon />
      </Link>
    </div>
  );
};

export default Group;
