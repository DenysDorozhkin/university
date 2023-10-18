import { useState, useEffect, FC, ChangeEvent } from "react";
import s from "../dashboard-view.module.scss";
import { CoursesService } from "../../../../services/courses/courses.service";
import { errorCatch } from "../../../../services/api/api.helper";
import { ICourseWithStudentsCount } from "../../../../services/courses/course.interface";
import ErrorDashboard from "../../../common/error/error-dashboard";
import SelectSort, { SelectOptionsType } from "./select-sort";
import InputSearch from "./input-search";
import Course from "./course";
import { StudentsService } from "../../../../services/students/students.service";
import { SingleValue } from "react-select";
import { useDebounce } from "usehooks-ts";
import CourseAdd from "./course-add";

const CoursesView: FC = () => {
  const [error, setError] = useState("");

  const [courses, setCourses] = useState<ICourseWithStudentsCount[]>([]);

  const getAllCourses = async () => {
    try {
      const courses = await CoursesService.getAll();
      const students = await StudentsService.getAllWithCourses();

      const coursesWithStudentsCount = courses.map((course) => {
        return {
          ...course,
          studentsCount: 0,
        };
      });

      students.forEach((student) => {
        student.courses.forEach((studentCourse) => {
          const course = coursesWithStudentsCount.find(
            (courseWithoutStudentsCount) => {
              return courseWithoutStudentsCount.id === studentCourse.id;
            }
          );
          if (course) {
            course.studentsCount++;
          }
        });
      });

      setCourses(coursesWithStudentsCount);
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
    getAllCourses();
  }, []);

  const handleSelectSort = (select: SingleValue<SelectOptionsType>) => {
    const notSortedCourses = [...courses];

    if (select?.value === "nameASC") {
      const sortedCourses = notSortedCourses.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      setCourses(sortedCourses);
    } else if (select?.value === "nameDESC") {
      const sortedCourses = notSortedCourses.sort((a, b) =>
        b.name.localeCompare(a.name)
      );

      setCourses(sortedCourses);
    } else if (select?.value === "latest") {
      const sortedCourses = notSortedCourses.sort(
        (a, b) => Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))
      );

      setCourses(sortedCourses);
    } else if (select?.value === "newest") {
      const sortedCourses = notSortedCourses.sort(
        (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
      );

      setCourses(sortedCourses);
    } else {
      getAllCourses();
    }
  };

  const [searchNameValue, setSearchNameValue] = useState<string>("");

  const debouncedValue = useDebounce<string>(searchNameValue, 500);

  const handleSearchNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchNameValue(e.target.value);
  };

  const getAllCoursesWithNameFilter = async (name: string) => {
    try {
      await getAllCourses();
      if (name !== "") {
        const filteredCourses = courses.filter((course) => {
          return course.name.toLowerCase().includes(name.toLowerCase());
        });

        setCourses(filteredCourses);
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
    getAllCoursesWithNameFilter(searchNameValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const [addModalIsActive, setAddModalIsActive] = useState(false);

  const modalCloseHandler = async () => {
    setAddModalIsActive(false);
    document.body.classList.remove("_lock");
    await getAllCourses();
  };

  const modalOpenHandler = () => {
    document.body.classList.add("_lock");
    setAddModalIsActive(true);
  };

  return (
    <main className={s.screen}>
      <CourseAdd isActive={addModalIsActive} closeHandler={modalCloseHandler} />
      <section className={s.actions}>
        <ErrorDashboard message={error} />
        <SelectSort handleSelect={handleSelectSort} />
        <InputSearch handleChange={handleSearchNameChange} />
        <button className={s.add} onClick={modalOpenHandler}>
          <img src="/img/add.svg" alt="add new course icon" /> Add new course
        </button>
      </section>
      <section className={s.content}>
        <div className={s.content__columns}>
          <div>Name</div>
          <div>Description</div>
          <div>Hours</div>
          <div>Students count</div>
          <div></div>
        </div>
        <div className={s.content__courses}>
          {courses.map((course: ICourseWithStudentsCount) => (
            <Course course={course} key={course.id} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default CoursesView;
