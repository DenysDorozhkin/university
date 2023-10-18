import Aside from "../../../common/aside";
import Header from "../../../common/header";
import StudentsView from "../../../views/dashboard/students";
import s from "../dashboard-layout.module.scss";
import {
  headerTitleEnum,
  menuActiveEnum,
} from "../enums/dashboard-layouts.enum";

const StudentsLayout = () => {
  return (
    <div className={s.page}>
      <Aside menuActive={menuActiveEnum.STUDENTS} />
      <section className={s.page__content}>
        <Header title={headerTitleEnum.STUDENTS} />
        <StudentsView />
      </section>
    </div>
  );
};

export default StudentsLayout;
