import { FC } from "react";
import s from "../dashboard-view.module.scss";
import EditIcon from "../edit-icon";
import { ICourseWithStudentsCount } from "../../../../services/courses/course.interface";
import { Link } from "react-router-dom";
import { Routes } from "../../../../utils/constants/routes.constant";
import clsx from "clsx";

type PropsType = {
  course: ICourseWithStudentsCount;
};

const Course: FC<PropsType> = ({ course }) => {
  return (
    <div className={s.entity} key={course.id}>
      <div>
        <p>{course.name}</p>
      </div>
      <div>
        <p>{course.description}</p>
      </div>
      <div>
        <p>{course.hours}</p>
      </div>
      <div>
        <p>{course.studentsCount}</p>
      </div>
      <Link
        to={`${Routes.COURSES_ROUTE}/update/${course.id}`}
        className={clsx(s.update, s.update__big)}
      >
        <EditIcon />
      </Link>
    </div>
  );
};

export default Course;
