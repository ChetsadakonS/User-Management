"use client";
import { ChangeEvent, FormEvent, useState } from 'react'
import { loginUser } from '../lib/LoginUser ';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';


export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await loginUser({
                email: form.email,
                password: form.password,
            });

            console.log('Login success:', res);
            await Swal.fire({
                icon: 'success',
                title: 'สำเร็จ',
                text: res.message || 'เพิ่มผู้ใช้งานเรียบร้อยแล้ว',
            });
            setSubmitted(true);
            router.push('/users');
        } catch (error: any) {
            await Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: error.message,
            });

        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-[family-name:var(--font-geist-sans)]">
            <div className="max-w-md w-full bg-white p-8 shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>

            </div>
        </div>
    );
}