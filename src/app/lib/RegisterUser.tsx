import { RegisterForm } from '@/app/types/Register';

export async function registerUser(userData: RegisterForm) {
    const response = await fetch('http://localhost:4000/register', {
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
