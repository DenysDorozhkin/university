import Aside from "../../../common/aside";
import Header from "../../../common/header";
import CoursesView from "../../../views/dashboard/courses";
import s from "../dashboard-layout.module.scss";
import {
  headerTitleEnum,
  menuActiveEnum,
} from "../enums/dashboard-layouts.enum";

const CoursesLayout = () => {
  return (
    <div className={s.page}>
      <Aside menuActive={menuActiveEnum.COURSES} />
      <section className={s.page__content}>
        <Header title={headerTitleEnum.COURSES} />
        <CoursesView />
      </section>
    </div>
  );
};

export default CoursesLayout;
