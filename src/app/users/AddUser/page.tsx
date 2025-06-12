'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AllRole } from "@/app/lib/ManageUser";
import { Roles } from '@/app/types/Role';
import { AddUser } from '@/app/lib/ManageUser';
import Swal from 'sweetalert2';

export default function EditUserPage() {
    const router = useRouter();
    const [role, setrole] = useState<Roles[]>([])
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        repassword: '',
        roleId: 1,
    });
    const [submitted, setSubmitted] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const datarole = await AllRole()
                setrole(datarole);
            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการโหลดข้อมูลผู้ใช้:', error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: name === "roleId" ? Number(value) : value
        }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.password !== form.repassword) {
            await Swal.fire({
                icon: 'warning',
                title: 'รหัสผ่านไม่ตรงกัน',
                text: 'กรุณากรอกให้ตรงกันทั้งสองช่อง',
            });
            setForm((prevForm) => ({
                ...prevForm,
                password: '',
                repassword: '',
            }));
            return;
        }
        try {
            const res = await AddUser({
                name: form.name,
                email: form.email,
                password: form.password,
                roleId: form.roleId,
            });
            await Swal.fire({
                icon: 'success',
                title: 'เพิ่มผู้ใช้สำเร็จ',
                text: res.message,
                timer: 2000,
                showConfirmButton: false,
            });
            setSubmitted(true);
            router.push('/users');

        } catch (error : any){
            await Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: error.message ,
            });
        }
    };
    return (
        <div className="p-6 max-w-xl mx-auto font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-2xl font-semibold mb-6">เพิ่มผู้ใช้งาน</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
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
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
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
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
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
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Role</label>
                    <select
                        name="roleId"
                        value={form.roleId}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    >
                        {role.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg"
                >
                    เพิ่มผู้ใช้งาน
                </button>
            </form>
        </div>
    );
}

