import { FC } from "react";
import UpdateLayout from "../../../layouts/dashboard/update";
import GroupUpdateView from "../../../views/dashboard/groups/group-update";

const GroupUpdatePage: FC = () => {
  return (
    <UpdateLayout>
      <GroupUpdateView />
    </UpdateLayout>
  );
};

export default GroupUpdatePage;
