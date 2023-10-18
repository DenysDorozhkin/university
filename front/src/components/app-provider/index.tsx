import { Provider } from "react-redux";
import { FC } from "react";
import { store } from "../../redux/store";
import AppRouter from "../app-router";

const AppProvider: FC = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default AppProvider;
