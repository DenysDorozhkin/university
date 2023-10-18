import { FC, useEffect, useState } from "react";
import { IStudentWithGroupNameAndCourses } from "../../../../../services/students/student.interface";
import s from "./student-detail.module.scss";
import { Link, useParams } from "react-router-dom";
import Avatar from "../avatar";
import { StudentsService } from "../../../../../services/students/students.service";
import { errorCatch } from "../../../../../services/api/api.helper";
import ErrorDashboard from "../../../../common/error/error-dashboard";
import { Routes } from "../../../../../utils/constants/routes.constant";

const StudentDetailView: FC = () => {
  const { id } = useParams();

  const [avatar, setAvatar] = useState<string | null>("");

  const [error, setError] = useState("");

  const [student, setStudent] = useState<IStudentWithGroupNameAndCourses>(
    {} as IStudentWithGroupNameAndCourses
  );

  const [studentCoursesLength, setStudentCoursesLength] = useState(0);

  const getAllStudents = async () => {
    try {
      const studentsWithGroupName = await StudentsService.getAllWithGroupName();

      const studentsWithCourses = await StudentsService.getAllWithCourses();

      const studentWithGroupNameAndCourses = studentsWithGroupName.map(
        (studentWithGroupName) => {
          const actualStudent = studentsWithCourses.filter(
            (studentWithCourses) => {
              return studentWithCourses.id === studentWithGroupName.id;
            }
          );

          const courses = actualStudent[0].courses;

          return {
            ...studentWithGroupName,
            courses,
          };
        }
      );

      const actualStudent = studentWithGroupNameAndCourses.filter((student) => {
        return student.id === id;
      })[0];

      setStudent(actualStudent);

      setStudentCoursesLength(actualStudent.courses.length);

      if (actualStudent.imagepath) {
        const studentAvatar = await StudentsService.getStudentAvatarByAvatarId(
          actualStudent.imagepath
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
    getAllStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={s.screen}>
      <ErrorDashboard message={error} />
      <div>
        Student: <p>{student.email}</p>
      </div>
      <div>
        <Avatar data={avatar} page="detail" />
      </div>
      <div>
        Name: <p>{student.name ? student.name : "-"}</p>
      </div>
      <div>
        Surname: <p>{student.surname ? student.surname : "-"}</p>
      </div>
      <div>
        Age: <p>{student.age ? student.age : "-"}</p>
      </div>
      <div className={s.entity__student_course}>
        Course:
        {studentCoursesLength === 0 ? (
          <p>"-"</p>
        ) : studentCoursesLength === 1 ? (
          <p>{student.courses[0].name}</p>
        ) : (
          student.courses.map((course) => <p key={course.id}>{course.name},</p>)
        )}
      </div>
      <div>
        Group: <p>{student.groupName ? student.groupName : "-"}</p>
      </div>
      <Link to={Routes.STUDENTS_ROUTE} className={s.back}>
        Go back
      </Link>
    </main>
  );
};

export default StudentDetailView;
