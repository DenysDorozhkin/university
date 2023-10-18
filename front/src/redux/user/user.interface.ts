import { ILector } from "../../services/lectors/lector.interface";

export interface IUserInitialState {
  user: ILector | undefined;
  isLoading: boolean;
  error: string | null;
}
