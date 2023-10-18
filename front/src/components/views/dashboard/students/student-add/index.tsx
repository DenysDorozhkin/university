import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import s from "./student-add.module.scss";
import { IStudentCreate } from "../../../../../services/students/student.interface";
import { StudentsService } from "../../../../../services/students/students.service";
import { errorCatch } from "../../../../../services/api/api.helper";
import clsx from "clsx";
import { emailValidator } from "../../../email.validator";
import ErrorModal from "../../../../common/error/error-modal";

type PropsType = {
  isActive: boolean;
  closeHandler: () => Promise<void>;
};

const StudentAdd: FC<PropsType> = ({ isActive, closeHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IStudentCreate>({
    mode: "onChange",
  });

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const onSubmit: SubmitHandler<IStudentCreate> = async (
    data: IStudentCreate
  ) => {
    setError("");
    try {
      data.age = parseInt(data.age.toString());
      await StudentsService.createStudent(data);

      setSuccess("Student added!");
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
        <h2 className={s.title}>Add new student</h2>
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
          Surname
          <input
            className={errors?.surname ? inputErrorClsx : s.input}
            placeholder="surname"
            {...register("surname", {
              required: "Surname is required field!",
            })}
            type="text"
          />
          {errors?.surname && (
            <div className={s.error}>{errors.surname.message}</div>
          )}
        </label>
        <label className={s.label}>
          Email
          <input
            className={errors?.email ? inputErrorClsx : s.input}
            placeholder="mail@mail.com"
            {...register("email", {
              required: "Email is required field!",
              pattern: {
                value: emailValidator,
                message: "Please enter valid email!",
              },
            })}
            type="email"
          />
          {errors?.email && (
            <div className={s.error}>{errors.email.message}</div>
          )}
        </label>
        <label className={s.label}>
          Age
          <input
            className={errors?.age ? inputErrorClsx : s.input}
            placeholder="age"
            {...register("age", {
              required: "Age is required field!",
            })}
            type="number"
          />
          {errors?.age && <div className={s.error}>{errors.age.message}</div>}
        </label>
        <button className={s.button} type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default StudentAdd;
