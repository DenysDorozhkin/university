import { FC } from "react";
import SignLayout from "../../layouts/sign";
import { layoutElements } from "./forgot-password.elements";
import ForgotPasswordView from "../../views/sign/forgot-password";

const ForgotPasswordPage: FC = () => {
  return (
    <SignLayout layoutElements={layoutElements}>
      <ForgotPasswordView />
    </SignLayout>
  );
};

export default ForgotPasswordPage;
