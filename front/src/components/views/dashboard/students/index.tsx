import { useState, useEffect, FC, ChangeEvent } from "react";
import s from "../dashboard-view.module.scss";
import { StudentsService } from "../../../../services/students/students.service";
import { errorCatch } from "../../../../services/api/api.helper";
import { IStudentWithGroupNameAndCourses } from "../../../../services/students/student.interface";
import ErrorDashboard from "../../../common/error/error-dashboard";
import SelectSort, { SelectOptionsType } from "./select-sort";
import InputSearch from "./input-search";
import Student from "./student";
import { SingleValue } from "react-select";
import { useDebounce } from "usehooks-ts";
import StudentAdd from "./student-add";

const StudentsView: FC = () => {
  const [error, setError] = useState("");

  const [students, setStudents] = useState<IStudentWithGroupNameAndCourses[]>(
    []
  );

  const getAllStudents = async () => {
    try {
      const studentsWithGroupName = await StudentsService.getAllWithGroupName();

      const studentsWithCourses = await StudentsService.getAllWithCourses();

      const studentsWithGroupNameAndCourses = studentsWithGroupName.map(
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

      setStudents(studentsWithGroupNameAndCourses);
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

  const handleSelectSort = (select: SingleValue<SelectOptionsType>) => {
    const notSortedStudents = [...students];

    if (select?.value === "nameASC") {
      const sortedStudents = notSortedStudents.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      setStudents(sortedStudents);
    } else if (select?.value === "nameDESC") {
      const sortedStudents = notSortedStudents.sort((a, b) =>
        b.name.localeCompare(a.name)
      );

      setStudents(sortedStudents);
    } else if (select?.value === "latest") {
      const sortedStudents = notSortedStudents.sort(
        (a, b) => Number(new Date(a.createdat)) - Number(new Date(b.createdat))
      );

      setStudents(sortedStudents);
    } else if (select?.value === "newest") {
      const sortedStudents = notSortedStudents.sort(
        (a, b) => Number(new Date(b.createdat)) - Number(new Date(a.createdat))
      );

      setStudents(sortedStudents);
    } else {
      getAllStudents();
    }
  };

  const [searchNameValue, setSearchNameValue] = useState<string>("");

  const debouncedValue = useDebounce<string>(searchNameValue, 500);

  const handleSearchNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchNameValue(e.target.value);
  };

  const getAllStudentsWithNameFilter = async (name: string) => {
    try {
      if (name !== "") {
        const studentsWithGroupName =
          await StudentsService.getAllWithGroupNameWithNameFilter(name);

        const studentsWithCourses =
          await StudentsService.getAllWithCoursesWithNameFilter(name);

        const studentsWithGroupNameAndCourses = studentsWithGroupName.map(
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

        setStudents(studentsWithGroupNameAndCourses);
      } else {
        await getAllStudents();
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
    getAllStudentsWithNameFilter(searchNameValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const [addModalIsActive, setAddModalIsActive] = useState(false);

  const modalCloseHandler = async () => {
    setAddModalIsActive(false);
    document.body.classList.remove("_lock");
    await getAllStudents();
  };

  const modalOpenHandler = () => {
    document.body.classList.add("_lock");
    setAddModalIsActive(true);
  };

  return (
    <main className={s.screen}>
      <StudentAdd
        isActive={addModalIsActive}
        closeHandler={modalCloseHandler}
      />
      <section className={s.actions}>
        <ErrorDashboard message={error} />
        <SelectSort handleSelect={handleSelectSort} />
        <InputSearch handleChange={handleSearchNameChange} />
        <button className={s.add} onClick={modalOpenHandler}>
          <img src="/img/add.svg" alt="add new student icon" /> Add new student
        </button>
      </section>
      <section className={s.content}>
        <div className={s.content__columns}>
          <div></div>
          <div>Name</div>
          <div>Surname</div>
          <div>Email</div>
          <div>Age</div>
          <div>Course</div>
          <div>Group</div>
          <div></div>
        </div>
        <div className={s.content__students}>
          {students.map((student: IStudentWithGroupNameAndCourses) => (
            <Student student={student} key={student.id} setError={setError} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default StudentsView;
