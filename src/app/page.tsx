'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-center text-center">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <h1 className="text-2xl sm:text-3xl font-semibold">ระบบจัดการผู้ใช้งาน (User Management System)</h1>

        <div className="flex gap-4 flex-col sm:flex-row">
          <Link
            href="/login"
            className="rounded-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 text-sm sm:text-base font-medium transition-colors"
          >
            🔑 เข้าสู่ระบบ
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 text-sm sm:text-base font-medium transition-colors border border-gray-300"
          >
            📝 สมัครสมาชิก
          </Link>
        </div>

        <div className="text-red-600 text-sm mt-4 max-w-md">
          <p>
            🔒 ต้องเข้าสู่ระบบด้วยบัญชี <strong>Admin</strong> เพื่อเพิ่มหรือแก้ไขข้อมูลผู้ใช้งาน<br />
          </p>
          <p>Email: t1@admin.com</p>
          <p>Password: 1234</p>
        </div>
      </main>
    </div>
  );
}
