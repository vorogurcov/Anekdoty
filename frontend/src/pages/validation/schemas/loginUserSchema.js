import { object, string} from 'yup';

const loginUserSchema = object({
    email:string().required("Email is required!").email("Email must be a valid email!"),// Проверка на пустое значение
    password:string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(/[!@#$%^&*]/, "Password must contain at least one special character (!@#$%^&*)")

})

export default loginUserSchema;

