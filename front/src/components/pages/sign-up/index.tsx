import { FC } from "react";
import SignLayout from "../../layouts/sign";
import { layoutElements } from "./sign-up.elements";
import SignUpView from "../../views/sign/sign-up";

const SignUpPage: FC = () => {
  return (
    <SignLayout layoutElements={layoutElements}>
      <SignUpView />
    </SignLayout>
  );
};

export default SignUpPage;
