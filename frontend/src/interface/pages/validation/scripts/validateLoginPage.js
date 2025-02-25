import loginUserSchema from "@/interface/pages/validation/schemas/loginUserSchema";
export const validateLoginPage = async (loginDto) => {
    const errors = {};
    try {
        Object.keys(loginDto).forEach((key)=>{
            errors[key] = '';
        })
        await loginUserSchema.validate(loginDto, { abortEarly: false });
        return { isValid: true, errors };
    } catch (err) {
        err.inner.forEach((error) => {
            if(!errors[error.path])
                errors[error.path]=error.message;
        });
        return { isValid: false, errors };
    }
};