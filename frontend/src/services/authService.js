import router from "@/router";

const encodeFormData = (formData) => {
    return new URLSearchParams(formData).toString();
};

export const submitLogin = async (formData) => {
    try {
        const response = await fetch('http://localhost:3000/auth/login', {
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
        const response = await fetch('http://localhost:3000/auth/register', {
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

export const refreshToken = async function(refreshToken){
    try {
        console.log('Making request to http://localhost:3000/auth/refresh')
        const response = await fetch('http://localhost:3000/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: encodeFormData(refreshToken),
            credentials:'include',
        });

        if (!response.ok) {
            throw new Error('Refresh token failed');
        }

        const data = await response.json();
        return data.accessToken
    } catch (error) {

        await router.push('/login');
        return;
    }
}
