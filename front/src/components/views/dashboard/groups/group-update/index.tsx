import { FC, useEffect, useState } from "react";
import s from "./group-update.module.scss";
import { Link, useParams } from "react-router-dom";
import { errorCatch } from "../../../../../services/api/api.helper";
import { Routes } from "../../../../../utils/constants/routes.constant";
import { SubmitHandler, useForm } from "react-hook-form";
import clsx from "clsx";
import ErrorUpdate from "../../../../common/error/error-update";
import { GroupsService } from "../../../../../services/groups/groups.service";
import { IGroupUpdateForm } from "./group-update.interface";
import { IGroup } from "../../../../../services/groups/group.interface";

const GroupUpdateView: FC = () => {
  const { id } = useParams();

  const [error, setError] = useState("");
  const inputErrorClsx = clsx(s.input, s.inputError);

  const [successGroup, setSuccessGroup] = useState("");

  const [group, setGroup] = useState<IGroup>({} as IGroup);

  const [formDefaultValues, setFormDefaultValues] = useState({
    name: "",
  });

  const getAllGroups = async () => {
    try {
      const groupsAll = await GroupsService.getAll();

      const actualGroup = groupsAll.filter((group) => {
        return group.id === id;
      })[0];

      setGroup(actualGroup);

      setFormDefaultValues({
        name: actualGroup.name,
      });
      reset({
        name: actualGroup.name,
      });
    } catch (err) {
      const errorMessage = errorCatch(err);

      if (errorMessage) {
        setError(errorMessage);
      } else {
        setError("Unknown error...");
      }
    }
  };

  useEffect(() => {
    getAllGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IGroupUpdateForm>({
    mode: "onChange",
    defaultValues: formDefaultValues,
  });

  const onSubmit: SubmitHandler<IGroupUpdateForm> = async (
    data: IGroupUpdateForm
  ) => {
    setError("");
    setSuccessGroup("");
    try {
      const groupData = {} as IGroupUpdateForm;

      if (data.name && data.name !== group.name) groupData.name = data.name;

      if (groupData.name) {
        const updatedGroup = await GroupsService.updateGroup(
          group.id,
          groupData
        );
        if (updatedGroup) {
          setSuccessGroup("Group data successfully updated");
        }
      }
    } catch (err) {
      const errorMessage = errorCatch(err);

      if (errorMessage) {
        setError(errorMessage);
      } else {
        setError("Unknown error...");
      }
    } finally {
      await getAllGroups();
    }
  };

  return (
    <form className={s.screen} onSubmit={handleSubmit(onSubmit)}>
      <Link to={Routes.GROUPS_ROUTE} className={s.back}>
        <img src="/img/arrow-back.svg" alt="back icon" />
        Back
      </Link>
      <div className={s.content}>
        <div className={s.content__left}>
          <h1 className={s.title}>Group Information</h1>
          <label className={s.label}>
            Name
            <input
              className={errors?.name ? inputErrorClsx : s.input}
              placeholder="name"
              {...register("name", {
                required: "Name is required field!",
              })}
              type="text"
              defaultValue={formDefaultValues.name}
            />
            {errors?.name && (
              <div className={s.error}>{errors.name.message}</div>
            )}
          </label>
          <button
            className={
              Object.keys(errors).length
                ? clsx(s.button, s.button__error)
                : s.button
            }
            type="submit"
          >
            Save changes
          </button>
          <ErrorUpdate message={error} />
          <div className={s.success}>{successGroup ? successGroup : ""}</div>
        </div>
      </div>
    </form>
  );
};

export default GroupUpdateView;
