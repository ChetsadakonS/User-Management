# 🧑‍💼 User Management System

ระบบจัดการผู้ใช้งาน (User Management System) พัฒนาโดยใช้ [Next.js]รองรับการเข้าสู่ระบบ, สมัครสมาชิก และการจัดการผู้ใช้งาน เหมาะสำหรับระบบแอดมิน หรือระบบที่ต้องมีการตรวจสอบสิทธิ์ของผู้ใช้

---

## 🔗 Repository

GitHub: [ChetsadakonS/User-Management](https://github.com/ChetsadakonS/User-Management.git)

---

## 🚀 ฟีเจอร์หลัก (Features)

- 🔐 หน้า **เข้าสู่ระบบ** และ **สมัครสมาชิก**
- 🛡️ ตรวจสอบสิทธิ์ (เฉพาะผู้ใช้ประเภท Admin สามารถจัดการข้อมูลผู้ใช้ได้)
- ⚙️ ใช้ **Next.js 15+** 
- 🎨 ใช้ **Tailwind CSS**
- 🌐 รองรับ `.env` สำหรับเก็บค่า config
- 📂 จัดโครงสร้างไฟล์แบบแยกหน้า แยกประเภท

---

## 📁 โครงสร้างโปรเจกต์

```
src/
├── app/
│   ├── login/          # หน้า Login
│   ├── register/       # หน้า Register
│   ├── users/          # แสดง / แก้ไขผู้ใช้งาน
│   ├── lib/            # ฟังก์ชันช่วย เช่น auth
│   ├── types/          # TypeScript types
│   └── middleware.tsx  # Middleware สำหรับการป้องกัน route
```

---

## ⚙️ วิธีเริ่มต้นใช้งาน (Getting Started)

### 1. Clone โปรเจกต์

```bash
git clone https://github.com/ChetsadakonS/user_management.git
cd user_management
```

### 2. ติดตั้ง dependencies

```bash
npm install หรือ npm i
# หรือ
yarn install
```

### 3. ตั้งค่า `.env` (ต้องแตก branch 'develop')

เพื่อจัดการกับไฟล์ `.env`แนะนำให้แตก branch ก่อน ชื่อว่า `develop`

#### 🪄 คำสั่งที่ใช้:

```bash
เข้าขึ้น branch develop และไฟล์ทั้งหมด
git checkout -b develop
git pull origin develop


### 4. รันเซิร์ฟเวอร์

```bash
npm run dev
```

เปิดเบราว์เซอร์ที่: [http://localhost:3000](http://localhost:3000)

---

## 🧪 บัญชีทดสอบ

สามารถใช้บัญชีนี้เพื่อเข้าสู่ระบบ:
✅ เฉพาะ Admin สามารถเพิ่ม/ลบ/แก้ไขผู้ใช้งานได้
- **Email:** `t1@admin.com`
- **Password:** `1234`


---


