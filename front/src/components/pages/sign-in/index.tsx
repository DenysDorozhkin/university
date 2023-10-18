import { FC } from "react";
import SignLayout from "../../layouts/sign";
import { layoutElements } from "./sign-in.elements";
import SignInView from "../../views/sign/sign-in";
import { useAuth } from "../../../redux/hooks/useAuth";
import SignInAuthView from "../../views/sign/sign-in-auth";

const SignInPage: FC = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <SignLayout layoutElements={layoutElements}>
        <SignInAuthView user={user} />
      </SignLayout>
    );
  }
  return (
    <SignLayout layoutElements={layoutElements}>
      <SignInView />
    </SignLayout>
  );
};

export default SignInPage;
