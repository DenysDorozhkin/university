import Select, { MultiValue, StylesConfig } from "react-select";
import s from "../student-update.module.scss";
import { FC } from "react";

export type SelectOptionsTypeCourse = {
  label: string;
  value: string;
};

type IsMulti = true;

const selectStyle: StylesConfig<SelectOptionsTypeCourse, IsMulti> = {
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
  handleSelect: (select: MultiValue<SelectOptionsTypeCourse>) => void;
  selectOptions: SelectOptionsTypeCourse[];
  defaultValue: SelectOptionsTypeCourse[];
};

const SelectCourse: FC<PropsType> = ({
  handleSelect,
  selectOptions,
  defaultValue,
}) => {
  if (!defaultValue.length) {
    return null;
  }
  return (
    <div className={s.filter}>
      <p>Course</p>
      <Select
        options={selectOptions}
        className={s.select}
        styles={selectStyle}
        defaultValue={defaultValue}
        onChange={handleSelect}
        isMulti
      />
    </div>
  );
};

export default SelectCourse;

type PropsTypeWithoutCourse = {
  handleSelect: (select: MultiValue<SelectOptionsTypeCourse>) => void;
  selectOptions: SelectOptionsTypeCourse[];
  defaultValue: SelectOptionsTypeCourse[];
};

export const SelectCourseWithoutCourse: FC<PropsTypeWithoutCourse> = ({
  handleSelect,
  selectOptions,
  defaultValue,
}) => {
  return (
    <div className={s.filter}>
      <p>Course</p>
      <Select
        options={selectOptions}
        className={s.select}
        styles={selectStyle}
        onChange={handleSelect}
        isMulti
      />
    </div>
  );
};
