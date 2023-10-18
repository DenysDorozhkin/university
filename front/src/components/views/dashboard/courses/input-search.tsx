import { ChangeEvent, FC, useState } from "react";
import clsx from "clsx";
import s from "../dashboard-view.module.scss";

type PropsType = {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const InputSearch: FC<PropsType> = ({ handleChange }) => {
  const [searchFocus, setSearchFocus] = useState(false);

  return (
    <label className={searchFocus ? clsx(s.search, s.focus) : s.search}>
      <img src="/img/search.svg" alt="search icon" />
      <input
        type="text"
        placeholder={"Search"}
        onFocus={() => setSearchFocus(true)}
        onBlur={() => setSearchFocus(false)}
        onChange={handleChange}
      />
    </label>
  );
};

export default InputSearch;
