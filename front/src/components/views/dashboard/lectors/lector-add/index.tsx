import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import s from "./lector-add.module.scss";
import { ILectorCreate } from "../../../../../services/lectors/lector.interface";
import { LectorsService } from "../../../../../services/lectors/lectors.service";
import { errorCatch } from "../../../../../services/api/api.helper";
import clsx from "clsx";
import { emailValidator } from "../../../email.validator";
import ErrorModal from "../../../../common/error/error-modal";

type PropsType = {
  isActive: boolean;
  closeHandler: () => Promise<void>;
};

const LectorAdd: FC<PropsType> = ({ isActive, closeHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILectorCreate>({
    mode: "onChange",
  });

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const onSubmit: SubmitHandler<ILectorCreate> = async (
    data: ILectorCreate
  ) => {
    setError("");
    try {
      await LectorsService.createLector(data);

      setSuccess("Lector added!");
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
        <h2 className={s.title}>Add new lector</h2>
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
          Password
          <input
            className={errors?.password ? inputErrorClsx : s.input}
            placeholder="password"
            {...register("password", {
              required: "Password is required field!",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long!",
              },
            })}
            type="text"
          />
          {errors?.password && (
            <div className={s.error}>{errors.password.message}</div>
          )}
        </label>
        <button className={s.button} type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default LectorAdd;
