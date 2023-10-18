import Aside from "../../../common/aside";
import Header from "../../../common/header";
import GroupsView from "../../../views/dashboard/groups";
import s from "../dashboard-layout.module.scss";
import {
  headerTitleEnum,
  menuActiveEnum,
} from "../enums/dashboard-layouts.enum";

const GroupsLayout = () => {
  return (
    <div className={s.page}>
      <Aside menuActive={menuActiveEnum.GROUPS} />
      <section className={s.page__content}>
        <Header title={headerTitleEnum.GROUPS} />
        <GroupsView />
      </section>
    </div>
  );
};

export default GroupsLayout;
