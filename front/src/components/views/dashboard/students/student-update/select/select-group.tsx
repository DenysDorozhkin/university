import Select, { SingleValue, StylesConfig } from "react-select";
import s from "../student-update.module.scss";
import { FC } from "react";

export type SelectOptionsTypeGroup = {
  label: string;
  value: string;
};

type IsMulti = false;

const selectStyle: StylesConfig<SelectOptionsTypeGroup, IsMulti> = {
  singleValue: (provided) => ({
    ...provided,
    overflow: "visible",
  }),
  control: (provided) => ({
    ...provided,
    border: "1px solid #505E68",
    display: "flex",
    backgroundColor: "#fff",
    width: "376px",
    height: "48px",
    borderRadius: "0",
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
    color: "#000000",
  }),
};

type PropsType = {
  handleSelect: (select: SingleValue<SelectOptionsTypeGroup>) => void;
  selectOptions: SelectOptionsTypeGroup[];
  defaultValue: SelectOptionsTypeGroup;
};

const SelectGroup: FC<PropsType> = ({
  handleSelect,
  selectOptions,
  defaultValue,
}) => {
  if (!defaultValue.value) {
    return null;
  }
  return (
    <div className={s.filter}>
      <p>Group</p>
      <Select
        options={selectOptions}
        className={s.select}
        styles={selectStyle}
        defaultValue={defaultValue}
        onChange={handleSelect}
      />
    </div>
  );
};

export default SelectGroup;

type PropsTypeWithoutGroup = {
  handleSelect: (select: SingleValue<SelectOptionsTypeGroup>) => void;
  selectOptions: SelectOptionsTypeGroup[];
  defaultValue: SelectOptionsTypeGroup;
};

export const SelectGroupWithoutGroup: FC<PropsTypeWithoutGroup> = ({
  handleSelect,
  selectOptions,
  defaultValue,
}) => {
  return (
    <div className={s.filter}>
      <p>Group</p>
      <Select
        options={selectOptions}
        className={s.select}
        styles={selectStyle}
        onChange={handleSelect}
      />
    </div>
  );
};
