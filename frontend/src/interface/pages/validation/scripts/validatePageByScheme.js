export const validatePageByScheme = async (pageDto, scheme) => {
    const errors = {};
    try {
        Object.keys(pageDto).forEach((key)=>{
            errors[key] = '';
        })
        await scheme.validate(pageDto, { abortEarly: false });
        return { isValid: true, errors };
    } catch (err) {
        err.inner.forEach((error) => {
            if(!errors[error.path])
                errors[error.path]=error.message;
        });

        return { isValid: false, errors };
    }
};