import { FC } from "react";
import s from "./aside.module.scss";
import { menuActiveEnum } from "../../layouts/dashboard/enums/dashboard-layouts.enum";
import { Link, useNavigate } from "react-router-dom";
import { Routes } from "../../../utils/constants/routes.constant";
import { useActions } from "../../../redux/hooks/useActions";

type PropsType = {
  menuActive: menuActiveEnum;
};

const dashboardMenuItems = [
  {
    name: "Dashboard",
    imgPath: "/img/dashboard/icons/dashboard.svg",
    route: "",
  },
  {
    name: "Courses",
    imgPath: "/img/dashboard/icons/courses.svg",
    route: Routes.COURSES_ROUTE,
  },
  {
    name: "Lectors",
    imgPath: "/img/dashboard/icons/lectors.svg",
    route: Routes.LECTORS_ROUTE,
  },
  {
    name: "Groups",
    imgPath: "/img/dashboard/icons/groups.svg",
    route: Routes.GROUPS_ROUTE,
  },
  {
    name: "Students",
    imgPath: "/img/dashboard/icons/students.svg",
    route: Routes.STUDENTS_ROUTE,
  },
];

const Aside: FC<PropsType> = ({ menuActive }) => {
  const navigate = useNavigate();

  const { logout: logoutUser } = useActions();

  const logoutHandler = async () => {
    logoutUser();

    navigate(Routes.SIGN_IN_ROUTE);
  };

  return (
    <aside className={s.dashboard}>
      <div className={s.dashboard__top}>
        <div className={s.logo}>
          <img src="/img/dashboard/logo-dashboard.svg" alt="dashboard logo" />
        </div>
        <ul className={s.menu}>
          {dashboardMenuItems.map((item) => {
            if (item.name === "Dashboard") {
              return (
                <li key={item.name} className={s.menu__dashboard}>
                  <img
                    src={item.imgPath}
                    alt={`${item.name.toLowerCase()} icon`}
                  />
                  {item.name}
                </li>
              );
            } else {
              return (
                <li
                  key={item.name}
                  className={
                    menuActive === item.name.toLowerCase() ? s.active : ""
                  }
                >
                  <Link to={item.route}>
                    <img
                      src={item.imgPath}
                      alt={`${item.name.toLowerCase()} icon`}
                    />
                    {item.name}
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </div>
      <button className={s.logout} onClick={logoutHandler}>
        <img src="/img/dashboard/icons/logout.svg" alt="logout icon" />
        Log out
      </button>
    </aside>
  );
};

export default Aside;
