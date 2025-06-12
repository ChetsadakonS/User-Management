'use client';

import { useEffect, useState } from 'react';
import { UserList } from '../lib/UserList';
import { Users } from '../types/User';
import { getCurrentUser } from '../lib/getCurrentUser';
import { useRouter } from 'next/navigation';
import { deleteUser } from '../lib/ManageUser';
import Swal from 'sweetalert2';

export default function UsersPage() {
  const [users, setUsers] = useState<Users[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const data = await UserList();
      setUsers(data);

      const UserInfo = await getCurrentUser();
      const admin = UserInfo?.user?.roleId == 2;
      setIsAdmin(admin);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการโหลดผู้ใช้:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: 'ต้องการลบผู้ใช้งานนี้จริงหรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'ใช่!',
      cancelButtonText: 'ยกเลิก'
    });

    if (!result.isConfirmed) return;
    try {
      const res = await deleteUser(id);
      await Swal.fire({
        icon: 'success',
        title: 'ลบสำเร็จ',
        text: res.message,
        timer: 2000,
        showConfirmButton: false
      });
      await fetchUsers()
    } catch (error: any) {
      await Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: error.message
      });
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/users/${id}`);
  }
  const handleAdd = () => {
    router.push(`/users/AddUser`);
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-4 sm:p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">รายชื่อผู้ใช้งาน</h1>
        {isAdmin ? (
          <button
            onClick={handleAdd}
            type="button"
            className="w-full sm:w-auto focus:outline-none text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-yellow-300
               font-medium rounded-lg px-3 py-2 sm:py-2.5 text-sm sm:text-sm"
          >
            ✏️ เพิ่มผู้ใช้
          </button>
        ) : (
          <div className="text-red-600 text-sm mt-4 max-w-md">
            <p>
              🔒 ต้องเข้าสู่ระบบด้วยบัญชี <strong>Admin</strong> เพื่อเพิ่มหรือแก้ไขข้อมูลผู้ใช้งาน<br />
            </p>
            <p>Email: t1@admin.com</p>
            <p>Password: 1234</p>
          </div>
        )}

        <div className="overflow-x-auto py-4">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-700 border-b">#</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 border-b">ID</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 border-b">ชื่อ</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 border-b">อีเมล</th>
                <th className="px-4 py-3 text-center font-medium text-gray-700 border-b">
                  {isAdmin ? 'การจัดการ' : <span className="invisible">การจัดการ</span>}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800">{index + 1}</td>
                  <td className="px-4 py-3 text-gray-800">{user.id}</td>
                  <td className="px-4 py-3 text-gray-900">{user.name}</td>
                  <td className="px-4 py-3 text-gray-600">{user.email}</td>
                  {isAdmin && (
                    <td className="px-4 py-3 text-center space-y-2 sm:space-y-0 sm:space-x-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(user.id)}
                        className="w-full sm:w-auto focus:outline-none text-gray-800 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300
                    font-medium rounded-lg px-3 py-2 sm:py-2.5 text-sm sm:text-sm"
                      >
                        ✏️ แก้ไข
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(user.id)}
                        className="w-full sm:w-auto focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 
                    font-medium rounded-lg px-3 py-2 sm:py-2.5 text-sm sm:text-sm"
                      >
                        🗑️ ลบ
                      </button>
                    </td>
                  )}
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-400 py-6">
                    ไม่มีข้อมูลผู้ใช้
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
}
