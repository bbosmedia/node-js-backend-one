import { ref } from "yup";
import { object, string } from "yup";


export const createUserSchema =  object().shape({
    body: object().shape({
      name: string().required("Name is required"),
      password: string()
        .required("Password is required")
        .min(6, "Password is too short - should be 6 chars minimum.")
        .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
      passwordConfirmation: string().oneOf(
        [ref("password"), null],
        "Passwords must match"
      ),
      email: string()
        .email("Must be a valid email")
        .required("Email is required"),
    }),
  })