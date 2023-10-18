import { FC, useEffect, useState } from "react";
import s from "../dashboard-view.module.scss";
import { IStudentWithGroupNameAndCourses } from "../../../../services/students/student.interface";
import EditIcon from "../edit-icon";
import { StudentsService } from "../../../../services/students/students.service";
import { errorCatch } from "../../../../services/api/api.helper";
import Avatar from "./avatar";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { Routes } from "../../../../utils/constants/routes.constant";

type PropsType = {
  student: IStudentWithGroupNameAndCourses;
  setError: (value: React.SetStateAction<string>) => void;
};

const Student: FC<PropsType> = ({ student, setError }) => {
  const [avatar, setAvatar] = useState<string | null>("");

  const getStudentAvatar = async () => {
    try {
      if (student.imagepath) {
        const studentAvatar = await StudentsService.getStudentAvatarByAvatarId(
          student.imagepath
        );

        setAvatar(studentAvatar);
      } else {
        setAvatar(null);
      }
    } catch (err) {
      const errorMessage = errorCatch(err);

      if (errorMessage) {
        setError(errorMessage);
      } else {
        setError("Unknown error...");
      }
    }
  };

  useEffect(() => {
    getStudentAvatar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={clsx(s.entity, s.entity__student)}>
      <div>
        <Avatar data={avatar} />
      </div>
      <div>
        <p>{student.name ? student.name : "-"}</p>
      </div>
      <div>
        <p>{student.surname ? student.surname : "-"}</p>
      </div>
      <div>
        <p>{student.email}</p>
      </div>
      <div>
        <p>{student.age ? student.age : "-"}</p>
      </div>
      <div className={s.entity__student_course}>
        {student.courses.length === 0
          ? "-"
          : student.courses.length === 1
          ? student.courses[0].name
          : student.courses.map((course) => (
              <p key={course.id}>{course.name},</p>
            ))}
      </div>
      <div>
        <p>{student.groupName ? student.groupName : "-"}</p>
      </div>
      <Link to={`${Routes.STUDENTS_ROUTE}/${student.id}`} className={s.detail}>
        Detail
      </Link>
      <Link
        to={`${Routes.STUDENTS_ROUTE}/update/${student.id}`}
        className={s.update}
      >
        <EditIcon />
      </Link>
    </div>
  );
};

export default Student;
