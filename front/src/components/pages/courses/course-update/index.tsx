import { FC } from "react";
import UpdateLayout from "../../../layouts/dashboard/update";
import CourseUpdateView from "../../../views/dashboard/courses/course-update";

const CourseUpdatePage: FC = () => {
  return (
    <UpdateLayout>
      <CourseUpdateView />
    </UpdateLayout>
  );
};

export default CourseUpdatePage;
