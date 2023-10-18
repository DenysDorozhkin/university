import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import s from "../../sign-view.module.scss";
import { IResetPassword } from "../reset-password.interface";

type PropsType = {
  register: UseFormRegister<IResetPassword>;
  togglePasswordVisibility: () => void;
};

const PasswordCheckbox: FC<PropsType> = ({
  register,
  togglePasswordVisibility,
}) => {
  return (
    <label className={s.labelShowPassword}>
      Show Password
      <input
        onClick={togglePasswordVisibility}
        className={s.checkbox}
        defaultChecked={false}
        {...register("showPassword")}
        type="checkbox"
      />
    </label>
  );
};

export default PasswordCheckbox;
