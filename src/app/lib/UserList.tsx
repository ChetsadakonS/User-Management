
export async function UserList() {
    const response = await fetch('http://localhost:4000/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });
    return response.json();
}
