
const encodeFormData = (formData) => {
    return new URLSearchParams(formData).toString();
};

export const submitLogin = async (formData) => {
    try {
        const response = await fetch('http://localhost:3000/login/submit/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: encodeFormData(formData),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const submitRegister = async (formData) => {
    try {
        const response = await fetch('http://localhost:3000/register/submit/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: encodeFormData(formData),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        return true;
    } catch (error) {
        console.error('Registration error:', error);
        return false;
    }
};
