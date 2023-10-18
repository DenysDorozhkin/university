import Select, { SingleValue, StylesConfig } from "react-select";
import s from "../dashboard-view.module.scss";
import { FC } from "react";

export type SelectOptionsType = {
  label: string;
  value: string;
};

type PropsType = {
  handleSelect: (select: SingleValue<SelectOptionsType>) => void;
};

export const selectOptions: SelectOptionsType[] = [
  { value: "all", label: "All" },
  { value: "nameASC", label: "A-Z" },
  { value: "nameDESC", label: "Z-A" },
  { value: "latest", label: "Latest first" },
  { value: "newest", label: "Newest first" },
];

const SelectSort: FC<PropsType> = ({ handleSelect }) => {
  type IsMulti = false;

  const selectStyle: StylesConfig<SelectOptionsType, IsMulti> = {
    control: (provided) => ({
      ...provided,
      border: "1px solid #E4E7ED",
      display: "flex",
      alignItems: "center",
      borderRadius: "6px",
      backgroundColor: "#fff",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "#3B4360" : "#9f9fb6",
      backgroundColor: "transparent",
      "&:hover": {
        ...provided,
        color: "#fff",
        backgroundColor: state.isSelected ? "#3333ff" : "#3333ff",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#3B4360",
    }),
  };

  return (
    <div className={s.filter}>
      <p>Sort by</p>
      <Select
        options={selectOptions}
        className={s.select}
        styles={selectStyle}
        defaultValue={selectOptions[0]}
        onChange={handleSelect}
      />
    </div>
  );
};

export default SelectSort;
