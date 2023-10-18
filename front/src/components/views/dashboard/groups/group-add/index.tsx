import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import s from "./group-add.module.scss";
import { IGroupCreate } from "../../../../../services/groups/group.interface";
import { GroupsService } from "../../../../../services/groups/groups.service";
import { errorCatch } from "../../../../../services/api/api.helper";
import clsx from "clsx";
import ErrorModal from "../../../../common/error/error-modal";

type PropsType = {
  isActive: boolean;
  closeHandler: () => Promise<void>;
};

const GroupAdd: FC<PropsType> = ({ isActive, closeHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IGroupCreate>({
    mode: "onChange",
  });

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const onSubmit: SubmitHandler<IGroupCreate> = async (data: IGroupCreate) => {
    setError("");
    try {
      await GroupsService.createGroup(data);

      setSuccess("Group added!");
    } catch (err) {
      const errorMessage = errorCatch(err);

      if (errorMessage) {
        setError(errorMessage);
      } else {
        setError("Unknown error...");
      }
    }
    reset();
  };

  const inputErrorClsx = clsx(s.input, s.inputError);

  return (
    <div className={isActive ? clsx(s.wrapper, s.active) : s.wrapper}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div onClick={closeHandler} className={s.close}>
          <img src="/img/modal-close.svg" alt="modal close button" />
        </div>
        <ErrorModal message={error} />
        <div className={s.success}>{success ? success : ""}</div>
        <h2 className={s.title}>Add new group</h2>
        <label className={s.label}>
          Name
          <input
            className={errors?.name ? inputErrorClsx : s.input}
            placeholder="name"
            {...register("name", {
              required: "Name is required field!",
            })}
            type="text"
          />
          {errors?.name && <div className={s.error}>{errors.name.message}</div>}
        </label>
        <button className={s.button} type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default GroupAdd;
