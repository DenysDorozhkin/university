import { Routes } from "../../utils/constants/routes.constant";
import CoursesPage from "../pages/courses";
import CourseUpdatePage from "../pages/courses/course-update";
import ForgotPasswordPage from "../pages/forgot-password";
import GroupsPage from "../pages/groups";
import GroupUpdatePage from "../pages/groups/group-update";
import LectorsPage from "../pages/lectors";
import LectorUpdatePage from "../pages/lectors/lector-update";
import ResetPasswordPage from "../pages/reset-password";
import SignInPage from "../pages/sign-in";
import SignUpPage from "../pages/sign-up";
import StudentsPage from "../pages/students";
import StudentDetailPage from "../pages/students/student-detail";
import StudentUpdatePage from "../pages/students/student-update";

export const publicRoutes = [
  {
    path: Routes.SIGN_IN_ROUTE,
    Component: SignInPage,
  },
  {
    path: Routes.SIGN_UP_ROUTE,
    Component: SignUpPage,
  },
  {
    path: Routes.FORGOT_PASSWORD_ROUTE,
    Component: ForgotPasswordPage,
  },
  {
    path: Routes.RESET_PASSWORD_ROUTE,
    Component: ResetPasswordPage,
  },
];

export const authRoutes = [
  {
    path: Routes.LECTORS_ROUTE,
    Component: LectorsPage,
  },
  {
    path: Routes.COURSES_ROUTE,
    Component: CoursesPage,
  },
  {
    path: Routes.STUDENTS_ROUTE,
    Component: StudentsPage,
  },
  {
    path: Routes.GROUPS_ROUTE,
    Component: GroupsPage,
  },
  {
    path: `${Routes.STUDENTS_ROUTE}/:id`,
    Component: StudentDetailPage,
  },
  {
    path: `${Routes.STUDENTS_ROUTE}/update/:id`,
    Component: StudentUpdatePage,
  },
  {
    path: `${Routes.LECTORS_ROUTE}/update/:id`,
    Component: LectorUpdatePage,
  },
  {
    path: `${Routes.GROUPS_ROUTE}/update/:id`,
    Component: GroupUpdatePage,
  },
  {
    path: `${Routes.COURSES_ROUTE}/update/:id`,
    Component: CourseUpdatePage,
  },
];
