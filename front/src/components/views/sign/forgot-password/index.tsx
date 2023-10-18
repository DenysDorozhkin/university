import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import s from "../sign-view.module.scss";
import { IForgotPassword } from "./forgot-password.interface";
import Email from "./email";
import { AuthService } from "../../../../services/auth/auth.service";
import { IForgotPasswordRequest } from "../../../../services/auth/auth.interface";
import { errorCatch } from "../../../../services/api/api.helper";
import Error from "../../../common/error";

const ForgotPasswordView: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForgotPassword>({
    mode: "onChange",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit: SubmitHandler<IForgotPassword> = async (
    data: IForgotPasswordRequest
  ) => {
    try {
      const result = await AuthService.forgotPassword({
        email: data.email,
      });

      result
        ? setSuccess("Email with link on your email!")
        : setError("Something went wrong...");
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

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <p className={s.subtitle}>
        Don't worry, happens to the best of us. Enter the email address
        associated with your account and we'll send you a link to reset.
      </p>
      <Email register={register} errors={errors} />
      <button className={s.button} type="submit">
        Send email
      </button>
      <Link className={s.formLink} to="/sign-in">
        Cancel
      </Link>
      <Error message={error} />
      <div className={s.forgotSuccess}>{success}</div>
    </form>
  );
};

export default ForgotPasswordView;
