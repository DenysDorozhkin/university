import { FC, useEffect, useState } from "react";
import s from "./lector-update.module.scss";
import { Link, useParams } from "react-router-dom";
import { errorCatch } from "../../../../../services/api/api.helper";
import { Routes } from "../../../../../utils/constants/routes.constant";
import { SubmitHandler, useForm } from "react-hook-form";
import { emailValidator } from "../../../email.validator";
import clsx from "clsx";
import ErrorUpdate from "../../../../common/error/error-update";
import { ILector } from "../../../../../services/lectors/lector.interface";
import { LectorsService } from "../../../../../services/lectors/lectors.service";
import { ILectorUpdateForm } from "./lector-update.interface";

const LectorUpdateView: FC = () => {
  const { id } = useParams();

  const [error, setError] = useState("");
  const inputErrorClsx = clsx(s.input, s.inputError);

  const [successLector, setSuccessLector] = useState("");

  const [lector, setLector] = useState<ILector>({} as ILector);

  const [formDefaultValues, setFormDefaultValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const getAllLectors = async () => {
    try {
      const lectorsAll = await LectorsService.getAll();

      const actualLector = lectorsAll.filter((lector) => {
        return lector.id === id;
      })[0];

      setLector(actualLector);

      setFormDefaultValues({
        name: actualLector.name ? actualLector.name : "",
        email: actualLector.email,
        password: "",
      });
      reset({
        name: actualLector.name ? actualLector.name : "",
        email: actualLector.email,
        password: "",
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
    getAllLectors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILectorUpdateForm>({
    mode: "onChange",
    defaultValues: formDefaultValues,
  });

  const onSubmit: SubmitHandler<ILectorUpdateForm> = async (
    data: ILectorUpdateForm
  ) => {
    setError("");
    setSuccessLector("");
    try {
      const lectorData = {} as ILectorUpdateForm;

      if (data.name && data.name !== lector.name) lectorData.name = data.name;

      if (data.email && data.email !== lector.email)
        lectorData.email = data.email;

      if (data.password) lectorData.password = data.password;

      if (lectorData.name || lectorData.email || lectorData.password) {
        const updatedLector = await LectorsService.updateLector(
          lector.id,
          lectorData
        );
        if (updatedLector) {
          setSuccessLector("Lector data successfully updated");
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
      await getAllLectors();
    }
  };

  return (
    <form className={s.screen} onSubmit={handleSubmit(onSubmit)}>
      <Link to={Routes.LECTORS_ROUTE} className={s.back}>
        <img src="/img/arrow-back.svg" alt="back icon" />
        Back
      </Link>
      <div className={s.content}>
        <div className={s.content__left}>
          <h1 className={s.title}>Personal Information</h1>
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
            Email
            <input
              className={errors?.email ? inputErrorClsx : s.input}
              placeholder="mail@mail.com"
              {...register("email", {
                pattern: {
                  value: emailValidator,
                  message: "Please enter valid email!",
                },
              })}
              type="email"
              defaultValue={formDefaultValues.email}
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
              {...register("password")}
              type="text"
              defaultValue={formDefaultValues.password}
            />
            {errors?.password && (
              <div className={s.error}>{errors.password.message}</div>
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
          <div className={s.success}>{successLector ? successLector : ""}</div>
        </div>
      </div>
    </form>
  );
};

export default LectorUpdateView;
