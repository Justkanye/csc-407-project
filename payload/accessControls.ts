import { Access } from "payload/config";
import { Admin, Student } from "./payload-types";

type User = Admin | Student;

export const isAdmin: Access = ({ req }) => {
  const user = req.user as User;
  return user?.role === "admin";
};

export const isTeacher: Access = ({ req }) => {
  const user = req.user as User;
  return user?.role === "teacher";
};

export const isStudent: Access = ({ req }) => {
  const user = req.user as User;
  return user?.role === "student";
};

export const isAdminOrTeacher: Access = ({ req }) => {
  const user = req.user as User;
  return user?.role === "admin" || user?.role === "teacher";
};
