'use client';

import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { getUserbyId, AllRole, UpdateUser } from "@/app/lib/ManageUser";
import { Users } from '@/app/types/User';
import { Roles } from '@/app/types/Role';
import Swal from 'sweetalert2';


export default function EditUserPage() {
    const params = useParams();
    const id = params.id;
    const router = useRouter();
    const [user, setUser] = useState<Users>();
    const [role, setrole] = useState<Roles[]>([])
    const [formData, setFormData] = useState({
        id: id,
        name: '',
        email: '',
        roleId: 1,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserbyId(Number(id));
                const user = data.user;
                setUser(user);
                setFormData({
                    id: id,
                    name: user.name,
                    email: user.email,
                    roleId: user.roleId,
                });
                const datarole = await AllRole()
                setrole(datarole);
            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการโหลดข้อมูลผู้ใช้:', error);
            }
        };
        if (id) fetchData();
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevForm) => ({
            ...prevForm,
            [name]: name === "roleId" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await UpdateUser({
                id: Number(formData.id),
                name: formData.name,
                email: formData.email,
                roleId: formData.roleId,
            });

            await Swal.fire({
                icon: 'success',
                title: 'อัปเดตสำเร็จ',
                text: res.message,
                timer: 2000,
                showConfirmButton: false,
            });
            router.push(`/users/`);
        } catch (error: any) {
            await Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: error.message,
            });
        }
    };
    return (
        <div className="p-6 max-w-xl mx-auto font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-2xl font-semibold mb-6">แก้ไขผู้ใช้งาน</h1>

            {user ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Role</label>
                        <select
                            name="roleId"
                            value={formData.roleId}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        >
                            {role.map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>


                    {user.createdAt && (
                        <div>
                            <label className="block text-sm font-medium mb-1">CreatedAt</label>
                            <input
                                type="text"
                                value={
                                    user.createdAt instanceof Date
                                        ? user.createdAt.toLocaleString()
                                        : new Date(user.createdAt).toLocaleString()
                                }
                                readOnly
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-500"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg"
                    >
                        💾 บันทึกการเปลี่ยนแปลง
                    </button>
                </form>
            ) : (
                <p>กำลังโหลดข้อมูล...</p>
            )}
        </div>
    );
}