import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FC, useEffect } from "react";
import { publicRoutes, authRoutes } from "./routes";
import SignInPage from "../pages/sign-in";
import { useAuth } from "../../redux/hooks/useAuth";
import { useActions } from "../../redux/hooks/useActions";

const AppRouter: FC = () => {
  const { user } = useAuth();

  const { checkAuth } = useActions();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map(({ path, Component }) => {
          return <Route key={path} path={path} element={<Component />} />;
        })}
        {user &&
          authRoutes.map(({ path, Component }) => {
            return <Route key={path} path={path} element={<Component />} />;
          })}
        <Route path="*" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
