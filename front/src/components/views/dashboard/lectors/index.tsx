import { useState, useEffect, FC, ChangeEvent } from "react";
import s from "../dashboard-view.module.scss";
import { LectorsService } from "../../../../services/lectors/lectors.service";
import { errorCatch } from "../../../../services/api/api.helper";
import { ILector } from "../../../../services/lectors/lector.interface";
import ErrorDashboard from "../../../common/error/error-dashboard";
import SelectSort, { SelectOptionsType } from "./select-sort";
import InputSearch from "./input-search";
import Lector from "./lector";
import { SingleValue } from "react-select";
import { useDebounce } from "usehooks-ts";
import LectorAdd from "./lector-add";

const LectorsView: FC = () => {
  const [error, setError] = useState("");

  const [lectors, setLectors] = useState<ILector[]>([]);

  const getAllLectors = async () => {
    try {
      const lectors = await LectorsService.getAll();

      setLectors(lectors);
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
    getAllLectors();
  }, []);

  const handleSelectSort = (select: SingleValue<SelectOptionsType>) => {
    const notSortedLectors = [...lectors];

    if (select?.value === "nameASC") {
      const sortedLectors = notSortedLectors.sort((a, b) =>
        a.email.localeCompare(b.email)
      );

      setLectors(sortedLectors);
    } else if (select?.value === "nameDESC") {
      const sortedLectors = notSortedLectors.sort((a, b) =>
        b.email.localeCompare(a.email)
      );

      setLectors(sortedLectors);
    } else if (select?.value === "latest") {
      const sortedLectors = notSortedLectors.sort(
        (a, b) => Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))
      );

      setLectors(sortedLectors);
    } else if (select?.value === "newest") {
      const sortedLectors = notSortedLectors.sort(
        (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
      );

      setLectors(sortedLectors);
    } else {
      getAllLectors();
    }
  };

  const [searchNameValue, setSearchNameValue] = useState<string>("");

  const debouncedValue = useDebounce<string>(searchNameValue, 500);

  const handleSearchNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchNameValue(e.target.value);
  };

  const getAllLectorsWithNameFilter = async (email: string) => {
    try {
      await getAllLectors();
      if (email !== "") {
        const filteredLectors = lectors.filter((lector) => {
          return lector.email.toLowerCase().includes(email.toLowerCase());
        });

        setLectors(filteredLectors);
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
    getAllLectorsWithNameFilter(searchNameValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const [addModalIsActive, setAddModalIsActive] = useState(false);

  const modalCloseHandler = async () => {
    setAddModalIsActive(false);
    document.body.classList.remove("_lock");
    await getAllLectors();
  };

  const modalOpenHandler = () => {
    document.body.classList.add("_lock");
    setAddModalIsActive(true);
  };

  return (
    <main className={s.screen}>
      <LectorAdd isActive={addModalIsActive} closeHandler={modalCloseHandler} />
      <section className={s.actions}>
        <ErrorDashboard message={error} />
        <SelectSort handleSelect={handleSelectSort} />
        <InputSearch handleChange={handleSearchNameChange} />
        <button className={s.add} onClick={modalOpenHandler}>
          <img src="/img/add.svg" alt="add new lector icon" /> Add new lector
        </button>
      </section>
      <section className={s.content}>
        <div className={s.content__columns}>
          <div>Name</div>
          <div>Email</div>
          <div>Password</div>
          <div></div>
        </div>
        <div className={s.content__lectors}>
          {lectors.map((lector: ILector) => (
            <Lector lector={lector} key={lector.id} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default LectorsView;
