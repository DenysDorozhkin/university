import { ChangeEvent, FC } from "react";
import Avatar from "./update-avatar";
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

const AvatarBlock: FC<PropsType> = ({
  data,
  register,
  errors,
  onAvatarChange,
}) => {
  return (
    <div className={s.avatarBlock}>
      <Avatar
        data={data}
        register={register}
        errors={errors}
        onAvatarChange={onAvatarChange}
      />
      <div className={s.avatarBlock__right}>
        <label
          className={
            data
              ? clsx(s.avatarBlock__button, s.avatarBlock__button_active)
              : s.avatarBlock__button
          }
        >
          Replace
          {data ? (
            <input
              className={errors?.avatar ? inputErrorClsx : s.input}
              {...register("avatar")}
              type="file"
              placeholder=""
              onChange={onAvatarChange}
            />
          ) : (
            ""
          )}
          {errors?.avatar && (
            <div className={s.error}>{errors.avatar.message}</div>
          )}
        </label>
        {!data ? <p className={s.noFile}>No file choosen</p> : ""}
        <p className={s.text}>
          Must be a .jpg or .png file smaller than 10MB and at least 400px by
          400px.
        </p>
      </div>
    </div>
  );
};

export default AvatarBlock;
