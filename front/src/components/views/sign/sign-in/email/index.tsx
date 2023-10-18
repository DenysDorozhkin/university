import { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import s from "../../sign-view.module.scss";
import { emailValidator } from "../../../email.validator";
import { ISignIn } from "../sign-in.interface";
import clsx from "clsx";

type PropsType = {
  register: UseFormRegister<ISignIn>;
  errors: FieldErrors<ISignIn>;
};

const Email: FC<PropsType> = ({ register, errors }) => {
  const inputErrorClsx = clsx(s.input, s.inputError);

  return (
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
      {errors?.email && <div className={s.error}>{errors.email.message}</div>}
    </label>
  );
};

export default Email;
