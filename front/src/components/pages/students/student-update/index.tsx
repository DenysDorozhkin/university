import { FC } from "react";
import UpdateLayout from "../../../layouts/dashboard/update";
import StudentUpdateView from "../../../views/dashboard/students/student-update";

const StudentUpdatePage: FC = () => {
  return (
    <UpdateLayout>
      <StudentUpdateView />
    </UpdateLayout>
  );
};

export default StudentUpdatePage;
