import loginUserSchema from "@/pages/validation/schemas/loginUserSchema";

export const validateLoginPage = async (loginDto) => {
    try {
        await loginUserSchema.validate(loginDto, { abortEarly: false });
        return { isValid: true, errors: {} };
    } catch (err) {
        console.log(err)
        const errors = {};
        err.inner.forEach((error) => {
            if(!errors[error.path])
                errors[error.path]=error.message;
        });
        console.log(errors)
        return { isValid: false, errors };
    }
};