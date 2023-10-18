import { FC } from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import s from "../../sign-view.module.scss";
import { IResetPassword } from "../reset-password.interface";
import clsx from "clsx";

type PropsType = {
  register: UseFormRegister<IResetPassword>;
  errors: FieldErrors<IResetPassword>;
  passwordShown: boolean;
  passwordType: "newPassword" | "confirmPassword";
  watch: UseFormWatch<IResetPassword>;
};

const Password: FC<PropsType> = ({
  register,
  errors,
  passwordShown,
  passwordType,
  watch,
}) => {
  const passwordTypeChange =
    passwordType === "newPassword"
      ? {
          passwordText: "New Password",
          passwordErrors: errors?.newPassword && (
            <div className={s.error}>{errors.newPassword.message}</div>
          ),
        }
      : {
          passwordText: "Confirm Password",
          passwordErrors: errors?.confirmPassword && (
            <div className={s.error}>{errors.confirmPassword.message}</div>
          ),
        };

  const inputErrorClsx = clsx(s.input, s.inputError);

  return (
    <label className={s.label}>
      {passwordTypeChange.passwordText}
      <input
        className={
          errors?.newPassword || errors?.confirmPassword
            ? inputErrorClsx
            : s.input
        }
        placeholder="password"
        {...register(passwordType, {
          required: `${passwordTypeChange.passwordText} is required field!`,
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters long!",
          },
          validate: (value: string) => {
            if (passwordType === "confirmPassword") {
              if (watch("newPassword") !== value) {
                return "Your passwords do not match!";
              }
            }
          },
        })}
        type={passwordShown ? "text" : "password"}
      />
      {passwordTypeChange.passwordErrors}
    </label>
  );
};

export default Password;
