import registerUserSchema from "@/pages/validation/schemas/registerUserSchema";
import * as yup from "yup";

export const validateRegisterPage = async (registerDto) => {
    try {
        const confirmPassword = registerDto.confirmPassword;
        if(confirmPassword !== registerDto.password) {
            throw new yup.ValidationError("Passwords must match", null, "confirmPassword");
        }
        delete registerDto['confirmPassword'];
        await registerUserSchema.validate(registerDto, { abortEarly: false });
        return { isValid: true, errors: {} };
    } catch (err) {

        const errors = {};
        err.inner.forEach((error) => {
            if(!errors[error.path])
                errors[error.path]=error.message;
        });

        return { isValid: false, errors };
    }
};