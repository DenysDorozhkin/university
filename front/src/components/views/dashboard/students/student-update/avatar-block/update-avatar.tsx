import { ChangeEvent, FC } from "react";
import s from "./avatar-block.module.scss";
import clsx from "clsx";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IStudentUpdateForm } from "../student-update.interface";
import { inputErrorClsx } from "..";

type PropsType = {
  data: string | null;
  register: UseFormRegister<IStudentUpdateForm>;
  errors: FieldErrors<IStudentUpdateForm>;
  onAvatarChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const UpdateAvatar: FC<PropsType> = ({
  data,
  register,
  errors,
  onAvatarChange,
}) => {
  if (data) {
    return (
      <img
        src={`data:image/jpg;base64,${data}`}
        alt="student avatar"
        className={s.avatar}
      />
    );
  } else {
    return (
      <div className={clsx(s.avatar, s.avatar__none)}>
        <label className={s.avatar__label}>
          <img src="/img/add-avatar.svg" alt="add avatar icon" />
          <input
            type="file"
            placeholder=""
            id="avatar"
            className={errors?.avatar ? inputErrorClsx : s.input}
            {...register("avatar")}
            onChange={onAvatarChange}
          />
          {errors?.avatar && (
            <div className={s.error}>{errors.avatar.message}</div>
          )}
        </label>
      </div>
    );
  }
};
export default UpdateAvatar;
