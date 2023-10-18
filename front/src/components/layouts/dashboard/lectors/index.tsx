import Aside from "../../../common/aside";
import Header from "../../../common/header";
import LectorsView from "../../../views/dashboard/lectors";
import s from "../dashboard-layout.module.scss";
import {
  headerTitleEnum,
  menuActiveEnum,
} from "../enums/dashboard-layouts.enum";

const LectorsLayout = () => {
  return (
    <div className={s.page}>
      <Aside menuActive={menuActiveEnum.LECTORS} />
      <section className={s.page__content}>
        <Header title={headerTitleEnum.LECTORS} />
        <LectorsView />
      </section>
    </div>
  );
};

export default LectorsLayout;
