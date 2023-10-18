import { FC } from "react";
import s from "../sign-view.module.scss";
import { Link } from "react-router-dom";
import { ILector } from "../../../../services/lectors/lector.interface";
import clsx from "clsx";

type PropsType = {
  user: ILector | undefined;
};

const SignInAuthView: FC<PropsType> = ({ user }) => {
  return (
    <div className={s.auth}>
      <p>{user?.email}</p>
      <Link className={clsx(s.button, s.link)} to="/lectors">
        Go to dashboard
      </Link>
    </div>
  );
};

export default SignInAuthView;
