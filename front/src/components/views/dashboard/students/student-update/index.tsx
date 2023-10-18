import { ChangeEvent, FC, useEffect, useState } from "react";
import { IStudentWithGroupNameAndCourses } from "../../../../../services/students/student.interface";
import s from "./student-update.module.scss";
import { Link, useParams } from "react-router-dom";
import { StudentsService } from "../../../../../services/students/students.service";
import { errorCatch } from "../../../../../services/api/api.helper";
import { Routes } from "../../../../../utils/constants/routes.constant";
import AvatarBlock from "./avatar-block/avatar-block";
import { SubmitHandler, useForm } from "react-hook-form";
import { IStudentUpdateForm } from "./student-update.interface";
import { emailValidator } from "../../../email.validator";
import clsx from "clsx";
import SelectGroup, {
  SelectGroupWithoutGroup,
  SelectOptionsTypeGroup,
} from "./select/select-group";
import { MultiValue, SingleValue } from "react-select";
import { GroupsService } from "../../../../../services/groups/groups.service";
import { CoursesService } from "../../../../../services/courses/courses.service";
import SelectCourse, {
  SelectCourseWithoutCourse,
  SelectOptionsTypeCourse,
} from "./select/select-course";
import ErrorUpdate from "../../../../common/error/error-update";

export const inputErrorClsx = clsx(s.input, s.inputError);

const StudentUpdateView: FC = () => {
  const { id } = useParams();

  const [error, setError] = useState("");

  const [successAvatar, setSuccessAvatar] = useState("");
  const [successCourse, setSuccessCourse] = useState("");
  const [successStudent, setSuccessStudent] = useState("");
  const [successGroup, setSuccessGroup] = useState("");

  const [student, setStudent] = useState<IStudentWithGroupNameAndCourses>(
    {} as IStudentWithGroupNameAndCourses
  );

  const [avatar, setAvatar] = useState<string | null>("");

  const [newAvatar, setNewAvatar] = useState<File>();

  const [formDefaultValues, setFormDefaultValues] = useState({
    name: "",
    surname: "",
    email: "",
    age: 0,
  });

  const [studentGroup, setStudentGroup] = useState<SelectOptionsTypeGroup>({
    label: "",
    value: "",
  });
  const [selectGroupsOptions, setSelectGroupsOptions] = useState<
    SelectOptionsTypeGroup[]
  >([]);
  const [newStudentGroup, setNewStudentGroup] =
    useState<SelectOptionsTypeGroup>({} as SelectOptionsTypeGroup);

  const [studentCourse, setStudentCourse] = useState<SelectOptionsTypeCourse[]>(
    []
  );
  const [selectCoursesOptions, setSelectCoursesOptions] = useState<
    SelectOptionsTypeCourse[]
  >([]);
  const [newStudentCourse, setNewStudentCourse] = useState<
    SelectOptionsTypeCourse[]
  >([]);

  const getAllStudents = async () => {
    try {
      const studentsWithGroupName = await StudentsService.getAllWithGroupName();

      const studentsWithCourses = await StudentsService.getAllWithCourses();

      const studentWithGroupNameAndCourses = studentsWithGroupName.map(
        (studentWithGroupName) => {
          const actualStudent = studentsWithCourses.filter(
            (studentWithCourses) => {
              return studentWithCourses.id === studentWithGroupName.id;
            }
          );

          const courses = actualStudent[0].courses;

          return {
            ...studentWithGroupName,
            courses,
          };
        }
      );

      const actualStudent = studentWithGroupNameAndCourses.filter((student) => {
        return student.id === id;
      })[0];

      const studentForGroupId = studentsWithCourses.find((student) => {
        return student.id === actualStudent.id;
      });

      if (actualStudent.groupName && studentForGroupId?.groupId) {
        setStudentGroup({
          label: actualStudent.groupName,
          value: studentForGroupId?.groupId,
        });
      }

      actualStudent.courses.forEach((course) => {
        setStudentCourse((prev) =>
          [...prev].concat([{ label: course.name, value: course.id }])
        );
      });

      setStudent(actualStudent);

      if (actualStudent.imagepath) {
        const studentAvatar = await StudentsService.getStudentAvatarByAvatarId(
          actualStudent.imagepath
        );

        setAvatar(studentAvatar);
      } else {
        setAvatar(null);
      }
      setFormDefaultValues({
        name: actualStudent.name,
        surname: actualStudent.surname,
        email: actualStudent.email,
        age: actualStudent.age,
      });
      reset({
        name: actualStudent.name,
        surname: actualStudent.surname,
        email: actualStudent.email,
        age: actualStudent.age,
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

  const getAllGroups = async () => {
    try {
      const groups = await GroupsService.getAll();

      const groupsForSelect = groups.map((group) => {
        return {
          value: group.id,
          label: group.name,
        };
      });
      setSelectGroupsOptions(groupsForSelect);
    } catch (err) {
      const errorMessage = errorCatch(err);

      if (errorMessage) {
        setError(errorMessage);
      } else {
        setError("Unknown error...");
      }
    }
  };

  const getAllCourses = async () => {
    try {
      const courses = await CoursesService.getAll();

      const coursesForSelect = courses.map((course) => {
        return {
          value: course.id,
          label: course.name,
        };
      });
      setSelectCoursesOptions(coursesForSelect);
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

  useEffect(() => {
    getAllCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getAllStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IStudentUpdateForm>({
    mode: "onChange",
    defaultValues: formDefaultValues,
  });

  const onSubmit: SubmitHandler<IStudentUpdateForm> = async (
    data: IStudentUpdateForm
  ) => {
    setError("");
    setSuccessAvatar("");
    setSuccessGroup("");
    setSuccessCourse("");
    setSuccessStudent("");

    try {
      if (newAvatar) {
        const formData = new FormData();

        formData.append("avatar", newAvatar as File);

        const response = await StudentsService.updateStudentAvatarById(
          student.id,
          formData
        );

        if (response) {
          setSuccessAvatar("Student avatar successfully changed");
        }
      }
      if (newStudentCourse.length) {
        newStudentCourse.forEach(async (course) => {
          if (
            !studentCourse.some(
              (alreadyCourse) => alreadyCourse.value === course.value
            )
          ) {
            const response = await CoursesService.addStudentToCourse(
              course.value,
              {
                studentId: student.id,
              }
            );
            if (response) {
              setSuccessCourse("Student successfully added to course");
            }
          }
        });
      }
      if (newStudentGroup.value) {
        if (studentGroup.value !== newStudentGroup.value) {
          const updatedStudent = await StudentsService.updateStudent(
            student.id,
            {
              groupId: newStudentGroup.value,
            }
          );
          if (updatedStudent) {
            setSuccessGroup("Student group successfully updated");
          }
        }
      }
      const studentData = {} as IStudentUpdateForm;

      if (data.name && data.name !== student.name) studentData.name = data.name;

      if (data.surname && data.surname !== student.surname)
        studentData.surname = data.surname;

      if (data.email && data.email !== student.email)
        studentData.email = data.email;

      if (
        data.age &&
        parseInt(data.age.toString()) !== parseInt(student.age.toString())
      )
        studentData.age = parseInt(data.age.toString());

      if (
        studentData.name ||
        studentData.surname ||
        studentData.email ||
        studentData.age
      ) {
        const updatedStudent = await StudentsService.updateStudent(
          student.id,
          studentData
        );
        if (updatedStudent) {
          setSuccessStudent("Student data successfully updated");
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
      await getAllStudents();
    }
  };

  const handleSelectGroup = (
    select: SingleValue<SelectOptionsTypeGroup>
  ): void => {
    setNewStudentGroup(select as SelectOptionsTypeGroup);
  };

  const handleSelectCourse = (
    select: MultiValue<SelectOptionsTypeCourse>
  ): void => {
    setNewStudentCourse([...select]);
  };

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files) {
        const file = e.target.files[0];
        setNewAvatar(file);
        const currentAvatar = await toBase64(file);
        const pattern = /data:\s*image\/(jpeg|jpg|png);.*?base64,/;
        const match = pattern.exec(currentAvatar as string);
        if (match && currentAvatar) {
          // const imageFormat = match[1];
          const outputString = currentAvatar.replace(match[0], "");
          setAvatar(outputString);
        }
      }
    } catch (err) {
      setError("File loading error");
    }
  };

  const toBase64 = (file: File): Promise<string | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject("File loading error");
    });

  return (
    <form className={s.screen} onSubmit={handleSubmit(onSubmit)}>
      <Link to={Routes.STUDENTS_ROUTE} className={s.back}>
        <img src="/img/arrow-back.svg" alt="back icon" />
        Back
      </Link>
      <div className={s.content}>
        <div className={s.content__left}>
          <h1 className={s.title}>Personal Information</h1>
          <AvatarBlock
            data={avatar}
            register={register}
            errors={errors}
            onAvatarChange={handleAvatarChange}
          />
          <label className={s.label}>
            Name
            <input
              className={errors?.name ? inputErrorClsx : s.input}
              placeholder="name"
              {...register("name")}
              type="text"
              defaultValue={formDefaultValues.name}
            />
            {errors?.name && (
              <div className={s.error}>{errors.name.message}</div>
            )}
          </label>
          <label className={s.label}>
            Surname
            <input
              className={errors?.surname ? inputErrorClsx : s.input}
              placeholder="surname"
              {...register("surname")}
              type="text"
              defaultValue={formDefaultValues.surname}
            />
            {errors?.surname && (
              <div className={s.error}>{errors.surname.message}</div>
            )}
          </label>
          <label className={s.label}>
            Email
            <input
              className={errors?.email ? inputErrorClsx : s.input}
              placeholder="mail@mail.com"
              {...register("email", {
                pattern: {
                  value: emailValidator,
                  message: "Please enter valid email!",
                },
              })}
              type="email"
              defaultValue={formDefaultValues.email}
            />
            {errors?.email && (
              <div className={s.error}>{errors.email.message}</div>
            )}
          </label>
          <label className={s.label}>
            Age
            <input
              className={errors?.age ? inputErrorClsx : s.input}
              placeholder="age"
              {...register("age")}
              type="number"
              defaultValue={formDefaultValues.age}
            />
            {errors?.age && <div className={s.error}>{errors.age.message}</div>}
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
        </div>
        <div className={s.content__right}>
          <h2 className={s.title}>Courses and Groups</h2>
          {studentGroup.value ? (
            <SelectGroup
              selectOptions={selectGroupsOptions}
              handleSelect={handleSelectGroup}
              defaultValue={studentGroup}
            />
          ) : (
            ""
          )}
          {!studentGroup.value ? (
            <SelectGroupWithoutGroup
              selectOptions={selectGroupsOptions}
              handleSelect={handleSelectGroup}
              defaultValue={studentGroup}
            />
          ) : (
            ""
          )}
          {studentCourse.length ? (
            <SelectCourse
              selectOptions={selectCoursesOptions}
              handleSelect={handleSelectCourse}
              defaultValue={studentCourse}
            />
          ) : (
            ""
          )}
          {!studentCourse.length ? (
            <SelectCourseWithoutCourse
              selectOptions={selectCoursesOptions}
              handleSelect={handleSelectCourse}
              defaultValue={studentCourse}
            />
          ) : (
            ""
          )}
          <ErrorUpdate message={error} />
          <div className={s.success}>{successAvatar ? successAvatar : ""}</div>
          <div className={s.success}>{successCourse ? successCourse : ""}</div>
          <div className={s.success}>
            {successStudent ? successStudent : ""}
          </div>
          <div className={s.success}>{successGroup ? successGroup : ""}</div>
        </div>
      </div>
    </form>
  );
};

export default StudentUpdateView;
