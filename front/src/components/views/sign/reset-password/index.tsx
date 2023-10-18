import { Dispatch, FC, SetStateAction, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import s from "../sign-view.module.scss";
import { IResetPassword } from "./reset-password.interface";
import Password from "./password";
import PasswordCheckbox from "./password-checkbox";
import { useSearchParams } from "react-router-dom";
import { AuthService } from "../../../../services/auth/auth.service";
import { errorCatch } from "../../../../services/api/api.helper";
import Error from "../../../common/error";

type PropsType = {
  changeSuccess: Dispatch<SetStateAction<boolean>>;
};

const ResetPasswordView: FC<PropsType> = ({ changeSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IResetPassword>({
    mode: "onChange",
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<IResetPassword> = async (
    data: IResetPassword
  ) => {
    if (token && email) {
      try {
        const result = await AuthService.resetPassword({
          email,
          password: data.newPassword,
          token,
        });

        console.log(result ? "Password changed!" : "Something went wrong...");

        changeSuccess(true);
      } catch (err) {
        const errorMessage = errorCatch(err);

        if (errorMessage) {
          setError(errorMessage);
        } else {
          setError("Unknown error...");
        }
      }
    } else {
      setError("You should come here from email link!");
    }

    reset();
  };

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <Password
        register={register}
        errors={errors}
        passwordShown={passwordShown}
        passwordType="newPassword"
        watch={watch}
      />
      <Password
        register={register}
        errors={errors}
        passwordShown={passwordShown}
        passwordType="confirmPassword"
        watch={watch}
      />
      <PasswordCheckbox
        register={register}
        togglePasswordVisibility={togglePasswordVisibility}
      />
      <button className={s.button} type="submit">
        Reset
      </button>
      <Error message={error} />
    </form>
  );
};

export default ResetPasswordView;
