"use client";
import { ChangeEvent, FormEvent, useState } from 'react'
import { registerUser } from '../lib/RegisterUser';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';


export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        repassword: '',
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
        if (form.password != form.repassword) {
            await Swal.fire({
                icon: 'error',
                title: 'รหัสผ่านไม่ตรงกัน',
                text: 'กรุณากรอกใหม่ให้ตรงกันทั้งสองช่อง',
            });
            setForm((prevForm) => ({
                ...prevForm,
                password: '',
                repassword: '',
            }));
            return;
        } else {
            try {
                const res = await registerUser({
                    name: form.name,
                    email: form.email,
                    password: form.password,
                });
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
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-[family-name:var(--font-geist-sans)]">
            <div className="max-w-md w-full bg-white p-8 shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

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

                    <div>
                        <label className="block text-sm font-medium mb-1">Confirm Password</label>
                        <input
                            type="password"
                            name="repassword"
                            value={form.repassword}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Register
                    </button>
                </form>

            </div>
        </div>
    );
}