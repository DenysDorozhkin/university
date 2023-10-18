import { FC, useEffect, useState } from "react";
import s from "./course-update.module.scss";
import { Link, useParams } from "react-router-dom";
import { errorCatch } from "../../../../../services/api/api.helper";
import { Routes } from "../../../../../utils/constants/routes.constant";
import { SubmitHandler, useForm } from "react-hook-form";
import clsx from "clsx";
import ErrorUpdate from "../../../../common/error/error-update";
import { ICourse } from "../../../../../services/courses/course.interface";
import { CoursesService } from "../../../../../services/courses/courses.service";
import { ICourseUpdateForm } from "./course-update.interface";

const CourseUpdateView: FC = () => {
  const { id } = useParams();

  const [error, setError] = useState("");
  const inputErrorClsx = clsx(s.input, s.inputError);

  const [successCourse, setSuccessCourse] = useState("");

  const [course, setCourse] = useState<ICourse>({} as ICourse);

  const [formDefaultValues, setFormDefaultValues] = useState({
    name: "",
    description: "",
    hours: 0,
  });

  const getAllCourses = async () => {
    try {
      const coursesAll = await CoursesService.getAll();

      const actualCourse = coursesAll.filter((course) => {
        return course.id === id;
      })[0];

      setCourse(actualCourse);

      setFormDefaultValues({
        name: actualCourse.name,
        description: actualCourse.description,
        hours: actualCourse.hours,
      });
      reset({
        name: actualCourse.name,
        description: actualCourse.description,
        hours: actualCourse.hours,
      });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICourseUpdateForm>({
    mode: "onChange",
    defaultValues: formDefaultValues,
  });

  const onSubmit: SubmitHandler<ICourseUpdateForm> = async (
    data: ICourseUpdateForm
  ) => {
    setError("");
    setSuccessCourse("");
    try {
      const courseData = {} as ICourseUpdateForm;

      if (data.name && data.name !== course.name) courseData.name = data.name;

      if (data.description && data.description !== course.description)
        courseData.description = data.description;

      if (
        data.hours &&
        parseInt(data.hours.toString()) !== parseInt(course.hours.toString())
      )
        courseData.hours = parseInt(course.hours.toString());

      if (courseData.name || courseData.description || courseData.hours) {
        const updatedcourse = await CoursesService.updateCourse(
          course.id,
          courseData
        );
        if (updatedcourse) {
          setSuccessCourse("Course data successfully updated");
        }
      }
    } catch (err) {
      const errorMessage = errorCatch(err);

      if (errorMessage) {
        setError(errorMessage);
      } else {
        setError("Unknown error...");
      }
    } finally {
      await getAllCourses();
    }
  };

  return (
    <form className={s.screen} onSubmit={handleSubmit(onSubmit)}>
      <Link to={Routes.COURSES_ROUTE} className={s.back}>
        <img src="/img/arrow-back.svg" alt="back icon" />
        Back
      </Link>
      <div className={s.content}>
        <div className={s.content__left}>
          <h1 className={s.title}>Course Information</h1>
          <label className={s.label}>
            Name
            <input
              className={errors?.name ? inputErrorClsx : s.input}
              placeholder="name"
              {...register("name")}
              type="text"
              defaultValue={formDefaultValues.name}
            />
            {errors?.name && (
              <div className={s.error}>{errors.name.message}</div>
            )}
          </label>
          <label className={s.label}>
            Description
            <input
              className={errors?.description ? inputErrorClsx : s.input}
              placeholder="description"
              {...register("description")}
              type="text"
              defaultValue={formDefaultValues.description}
            />
            {errors?.description && (
              <div className={s.error}>{errors.description.message}</div>
            )}
          </label>
          <label className={s.label}>
            Hours
            <input
              className={errors?.hours ? inputErrorClsx : s.input}
              placeholder="hours"
              {...register("hours")}
              type="number"
              defaultValue={formDefaultValues.hours}
            />
            {errors?.hours && (
              <div className={s.error}>{errors.hours.message}</div>
            )}
          </label>
          <button
            className={
              Object.keys(errors).length
                ? clsx(s.button, s.button__error)
                : s.button
            }
            type="submit"
          >
            Save changes
          </button>
          <ErrorUpdate message={error} />
          <div className={s.success}>{successCourse ? successCourse : ""}</div>
        </div>
      </div>
    </form>
  );
};

export default CourseUpdateView;
