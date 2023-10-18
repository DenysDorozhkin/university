import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import s from "../sign-view.module.scss";
import { ISignUp } from "./sign-up.interface";
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
    watch,
  } = useForm<ISignUp>({
    mode: "onChange",
  });

  const { signUp: signUpAction } = useActions();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ISignUp> = async (data: IAuthRequest) => {
    signUpAction({
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
        passwordType="password"
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
        Register
      </button>
      <Link className={s.formLink} to="/sign-in">
        Already have an account?
      </Link>
    </form>
  );
};

export default SignInView;
