import Aside from "../../../common/aside";
import Header from "../../../common/header";
import StudentDetailView from "../../../views/dashboard/students/student-detail";
import s from "../dashboard-layout.module.scss";
import {
  headerTitleEnum,
  menuActiveEnum,
} from "../enums/dashboard-layouts.enum";

const StudentDetailLayout = () => {
  return (
    <div className={s.page}>
      <Aside menuActive={menuActiveEnum.STUDENTS} />
      <section className={s.page__content}>
        <Header title={headerTitleEnum.STUDENTS} />
        <StudentDetailView />
      </section>
    </div>
  );
};

export default StudentDetailLayout;
