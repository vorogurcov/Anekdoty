import router from "@/router";
import { refreshToken } from "@/services/authService";

export const searchUserAnecdotes = async ({ page, sort, order }) => {
    try {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            await router.push('/error');
            return;
        }

        const url = new URL('http://localhost:3000/user/search');
        url.searchParams.append('page', page);
        url.searchParams.append('sort', sort);
        url.searchParams.append('order', order);

        console.log(`Requesting: ${url.toString()}`);

        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
        });

        if (response.status === 401) {
            console.error("Token expired");
            try {
                const newAccessToken = await refreshToken();
                localStorage.setItem('accessToken', newAccessToken);
                return await searchUserAnecdotes({ page, sort, order });
            } catch (error) {
                console.error("Error refreshing token:", error);
                await router.push('/error');
                return;
            }
        }

        if (response.status === 404) {
            console.error("Invalid token");
            await router.push('/login');
            return;
        }

        return await response.json();
    } catch (error) {
        console.error('Anecdote search error:', error);
        throw error;
    }
};

export const getRubrics = async function () {
    try {
        const url = 'http://localhost:3000/anecdoteScrapper/rubrics';
        console.log(`Requesting: ${url}`);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

        if (!response.ok) {
            throw new Error('Rubrics getter failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Anecdote search error:', error);
        throw error;
    }
}

export const anecdoteSearch = async function (anecdoteText) {
    try {
        const url = `http://localhost:3000/searchAnecdote?text=${anecdoteText}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

        return await response.json();
    } catch (error) {
        console.log(error.message);
    }
}

export const addNewAnecdote = async function (anecdote) {
    try {
        const anecdoteId = anecdote.id;
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            await router.push('/error');
            return;
        }

        const url = `http://localhost:3000/user/save/?anecdoteId=${anecdoteId}`;
        console.log(url);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (response.status === 401) {
            console.error("Token expired");
            try {
                const newAccessToken = await refreshToken();
                localStorage.setItem('accessToken', newAccessToken);
                return await addNewAnecdote(anecdote);
            } catch (error) {
                console.error("Error refreshing token:", error);
                await router.push('/error');
                return;
            }
        }

        if (response.status === 404) {
            console.error("Invalid token");
            await router.push('/login');
            return;
        }

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.log(error.message);
    }
};

export const fetchAllAnecdotes = async function (pageNumber) {
    try {
        const url = `http://localhost:3000/search?page=${pageNumber}&sort=text&order=DESC`;
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({})
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        return { anecdotes: data.data.anecdotes, total: data.data.total };
    } catch (error) {
        console.error("Error fetching anecdotes:", error);
        return [];
    }
};
