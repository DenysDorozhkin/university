import { TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from "../store";

// export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
