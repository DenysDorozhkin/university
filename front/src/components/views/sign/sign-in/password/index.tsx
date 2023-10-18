import { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import s from "../../sign-view.module.scss";
import { ISignIn } from "../sign-in.interface";
import clsx from "clsx";

type PropsType = {
  register: UseFormRegister<ISignIn>;
  errors: FieldErrors<ISignIn>;
  passwordShown: boolean;
};

const Password: FC<PropsType> = ({ register, errors, passwordShown }) => {
  const inputErrorClsx = clsx(s.input, s.inputError);

  return (
    <label className={s.label}>
      Password
      <input
        className={errors?.password ? inputErrorClsx : s.input}
        placeholder="password"
        {...register("password", {
          required: `Password is required field!`,
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters long",
          },
        })}
        type={passwordShown ? "text" : "password"}
      />
      {errors?.password && (
        <div className={s.error}>{errors.password.message}</div>
      )}
    </label>
  );
};

export default Password;
