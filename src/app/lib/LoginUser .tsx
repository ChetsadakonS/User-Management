import { LoginForm } from '@/app/types/Login';

export async function loginUser(userData: LoginForm) {
    const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const data = await response.json();

        throw new Error(data.message);
    }
    return response.json();
}
