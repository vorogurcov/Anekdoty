import { object, string, ref} from 'yup';

const registerUserSchema = object({
    name:string().required("Name is required"),
    email:string().required("Email is required!").email("Email must be a valid email!"),

    password:string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(/[!@#$%^&*]/, "Password must contain at least one special character (!@#$%^&*)"),
    confirmPassword: string()
        .required("Confirm Password is required")
        .oneOf([ref("password")], "Passwords must match")

})

export default registerUserSchema;
