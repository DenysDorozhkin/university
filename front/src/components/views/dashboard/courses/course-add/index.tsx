import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import s from "./course-add.module.scss";
import { ICourseCreate } from "../../../../../services/courses/course.interface";
import { CoursesService } from "../../../../../services/courses/courses.service";
import { errorCatch } from "../../../../../services/api/api.helper";
import clsx from "clsx";
import ErrorModal from "../../../../common/error/error-modal";

type PropsType = {
  isActive: boolean;
  closeHandler: () => Promise<void>;
};

const CourseAdd: FC<PropsType> = ({ isActive, closeHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICourseCreate>({
    mode: "onChange",
  });

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const onSubmit: SubmitHandler<ICourseCreate> = async (
    data: ICourseCreate
  ) => {
    setError("");
    try {
      data.hours = parseInt(data.hours.toString());
      await CoursesService.createCourse(data);

      setSuccess("Course added!");
    } catch (err) {
      const errorMessage = errorCatch(err);

      if (errorMessage) {
        setError(errorMessage);
      } else {
        setError("Unknown error...");
      }
    }
    reset();
  };

  const inputErrorClsx = clsx(s.input, s.inputError);

  return (
    <div className={isActive ? clsx(s.wrapper, s.active) : s.wrapper}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div onClick={closeHandler} className={s.close}>
          <img src="/img/modal-close.svg" alt="modal close button" />
        </div>
        <ErrorModal message={error} />
        <div className={s.success}>{success ? success : ""}</div>
        <h2 className={s.title}>Add new course</h2>
        <label className={s.label}>
          Name
          <input
            className={errors?.name ? inputErrorClsx : s.input}
            placeholder="name"
            {...register("name", {
              required: "Name is required field!",
            })}
            type="text"
          />
          {errors?.name && <div className={s.error}>{errors.name.message}</div>}
        </label>
        <label className={s.label}>
          Description
          <input
            className={errors?.description ? inputErrorClsx : s.input}
            placeholder="description"
            {...register("description", {
              required: "Description is required field!",
            })}
            type="text"
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
            {...register("hours", {
              required: "Hours is required field!",
            })}
            type="number"
          />
          {errors?.hours && (
            <div className={s.error}>{errors.hours.message}</div>
          )}
        </label>
        <button className={s.button} type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default CourseAdd;
