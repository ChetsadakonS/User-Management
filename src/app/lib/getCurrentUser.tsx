
export async function getCurrentUser() {
    const response = await fetch('http://localhost:4000/me', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });
    return response.json();
}
