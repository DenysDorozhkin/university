import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import s from "../sign-view.module.scss";
import { ISignIn } from "./sign-in.interface";
import Email from "./email";
import Password from "./password";
import PasswordCheckbox from "./password-checkbox";
import { Link, useNavigate } from "react-router-dom";
import { IAuthRequest } from "../../../../services/auth/auth.interface";
import { Routes } from "../../../../utils/constants/routes.constant";
import { useActions } from "../../../../redux/hooks/useActions";

const SignInView: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISignIn>({
    mode: "onChange",
  });

  const { signIn: signInAction } = useActions();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ISignIn> = async (data: IAuthRequest) => {
    signInAction({
      email: data.email,
      password: data.password,
    });
    reset();

    navigate(Routes.LECTORS_ROUTE);
  };

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <Email register={register} errors={errors} />
      <Password
        register={register}
        errors={errors}
        passwordShown={passwordShown}
      />
      <PasswordCheckbox
        register={register}
        togglePasswordVisibility={togglePasswordVisibility}
      />
      <button className={s.button} type="submit">
        Login
      </button>
      <Link className={s.formLink} to="/forgot-password">
        Forgot password?
      </Link>
      <Link className={s.formLink} to="/sign-up">
        Don't have an account yet?
      </Link>
    </form>
  );
};

export default SignInView;
