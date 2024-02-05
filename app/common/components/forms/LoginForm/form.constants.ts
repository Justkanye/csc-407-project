import * as Yup from "yup";

export const initialValues = {
  email: "",
  password: "",
};

export const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6).max(20),
});
