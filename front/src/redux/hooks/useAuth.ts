import { useTypedSelector } from "./hooks";

export const useAuth = () => useTypedSelector((state) => state.user);
