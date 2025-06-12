import { AddUsersForm, UpdateUsersForm } from '@/app/types/User';

export async function getUserbyId(id: number) {
    const response = await fetch(`http://localhost:4000/getUsersbyId/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });
    return response.json();
}

export async function AllRole() {
    const response = await fetch(`http://localhost:4000/AllRole`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });
    return response.json();
}
export async function AddUser(data: AddUsersForm) {
    const response = await fetch('http://localhost:4000/AddUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
    }
    return response.json();
}
export async function deleteUser(id: number) {
    const response = await fetch(`http://localhost:4000/deleteUser/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
    }
    return response.json();
}

export async function UpdateUser(data: UpdateUsersForm) {
    const response = await fetch(`http://localhost:4000/updateUser/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
    });
    return response.json();
}

