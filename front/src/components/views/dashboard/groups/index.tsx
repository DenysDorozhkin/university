import { useState, useEffect, FC, ChangeEvent } from "react";
import s from "../dashboard-view.module.scss";
import { GroupsService } from "../../../../services/groups/groups.service";
import { errorCatch } from "../../../../services/api/api.helper";
import { IGroup } from "../../../../services/groups/group.interface";
import ErrorDashboard from "../../../common/error/error-dashboard";
import SelectSort, { SelectOptionsType } from "./select-sort";
import InputSearch from "./input-search";
import Group from "./group";
import { SingleValue } from "react-select";
import { useDebounce } from "usehooks-ts";
import GroupAdd from "./group-add";

const GroupsView: FC = () => {
  const [error, setError] = useState("");

  const [groups, setGroups] = useState<IGroup[]>([]);

  const getAllGroups = async () => {
    try {
      const groups = await GroupsService.getAll();

      setGroups(groups);
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
  }, []);

  const handleSelectSort = (select: SingleValue<SelectOptionsType>) => {
    const notSortedGroups = [...groups];

    if (select?.value === "nameASC") {
      const sortedGroups = notSortedGroups.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      setGroups(sortedGroups);
    } else if (select?.value === "nameDESC") {
      const sortedGroups = notSortedGroups.sort((a, b) =>
        b.name.localeCompare(a.name)
      );

      setGroups(sortedGroups);
    } else if (select?.value === "latest") {
      const sortedGroups = notSortedGroups.sort(
        (a, b) => Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))
      );

      setGroups(sortedGroups);
    } else if (select?.value === "newest") {
      const sortedGroups = notSortedGroups.sort(
        (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
      );

      setGroups(sortedGroups);
    } else {
      getAllGroups();
    }
  };

  const [searchNameValue, setSearchNameValue] = useState<string>("");

  const debouncedValue = useDebounce<string>(searchNameValue, 500);

  const handleSearchNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchNameValue(e.target.value);
  };

  const getAllGroupsWithNameFilter = async (name: string) => {
    try {
      await getAllGroups();
      if (name !== "") {
        const filteredGroups = groups.filter((group) => {
          return group.name.toLowerCase().includes(name.toLowerCase());
        });

        setGroups(filteredGroups);
      }
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
    getAllGroupsWithNameFilter(searchNameValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const [addModalIsActive, setAddModalIsActive] = useState(false);

  const modalCloseHandler = async () => {
    setAddModalIsActive(false);
    document.body.classList.remove("_lock");
    await getAllGroups();
  };

  const modalOpenHandler = () => {
    document.body.classList.add("_lock");
    setAddModalIsActive(true);
  };

  return (
    <main className={s.screen}>
      <GroupAdd isActive={addModalIsActive} closeHandler={modalCloseHandler} />
      <section className={s.actions}>
        <ErrorDashboard message={error} />
        <SelectSort handleSelect={handleSelectSort} />
        <InputSearch handleChange={handleSearchNameChange} />
        <button className={s.add} onClick={modalOpenHandler}>
          <img src="/img/add.svg" alt="add new group icon" /> Add new group
        </button>
      </section>
      <section className={s.content}>
        <div className={s.content__columns}>
          <div>Name</div>
          <div></div>
        </div>
        <div className={s.content__groups}>
          {groups.map((group: IGroup) => (
            <Group group={group} key={group.id} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default GroupsView;
