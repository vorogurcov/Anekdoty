export const searchUserAnecdotes = async ({ page, sort, order }) => {
    try {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No access token available');
        }

        const url = new URL('http://localhost:3000/user/search');
        url.searchParams.append('page', page);
        url.searchParams.append('sort', sort);
        url.searchParams.append('order', order);

        const formData = new URLSearchParams();
        formData.append('accessToken', token);

        console.log(`Requesting: ${url.toString()}`);

        const response = await fetch(url.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString(),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Anecdote search failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Anecdote search error:', error);
        throw error;
    }
};

export const getRubrics = async function(){
    try {

        const url = 'http://localhost:3000/anekdotScrapper/rubrics'

        console.log(`Requesting: ${url}`);

        const response = await fetch(url.toString(), {
            method: 'GET',
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