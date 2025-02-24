import registerUserSchema from "@/pages/validation/schemas/registerUserSchema";

export const validateRegisterPage = async (registerDto) => {
    const errors = {};
    try {
        Object.keys(registerDto).forEach((key)=>{
            errors[key] = '';
        })
        await registerUserSchema.validate(registerDto, { abortEarly: false });
        return { isValid: true, errors };
    } catch (err) {
        err.inner.forEach((error) => {
            if(!errors[error.path])
                errors[error.path]=error.message;
        });

        return { isValid: false, errors };
    }
};