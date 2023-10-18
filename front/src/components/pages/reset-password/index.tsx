import { FC, useState } from "react";
import SignLayout from "../../layouts/sign";
import {
  layoutElements,
  layoutElementsSuccess,
} from "./reset-password.elements";
import ResetPasswordView from "../../views/sign/reset-password";
import ResetPasswordSuccessView from "../../views/sign/reset-password-success";

const ResetPasswordPage: FC = () => {
  const [success, setSuccess] = useState(false);

  if (success) {
    return (
      <SignLayout layoutElements={layoutElementsSuccess}>
        <ResetPasswordSuccessView />
      </SignLayout>
    );
  } else {
    return (
      <SignLayout layoutElements={layoutElements}>
        <ResetPasswordView changeSuccess={setSuccess} />
      </SignLayout>
    );
  }
};

export default ResetPasswordPage;
