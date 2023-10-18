import { FC } from "react";
import UpdateLayout from "../../../layouts/dashboard/update";
import LectorUpdateView from "../../../views/dashboard/lectors/lector-update";

const LectorUpdatePage: FC = () => {
  return (
    <UpdateLayout>
      <LectorUpdateView />
    </UpdateLayout>
  );
};

export default LectorUpdatePage;
