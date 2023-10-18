import { FC } from "react";
import { Link } from "react-router-dom";
import s from "../sign-view.module.scss";
import clsx from "clsx";

const ResetPasswordSuccessView: FC = () => {
  const subtitleClsx = clsx(s.subtitle, s.center);
  const buttonClsx = clsx(s.button, s.link);

  return (
    <section>
      <p className={subtitleClsx}>
        You can use your new password to log into your account
      </p>
      <Link className={buttonClsx} to="/sign-in">
        Log In
      </Link>
    </section>
  );
};

export default ResetPasswordSuccessView;
