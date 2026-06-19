# InMAXX Inventory Admin Template

โปรเจกต์นี้เป็นหน้าเว็บ Admin Dashboard แบบ Static สำหรับแสดงภาพรวมงาน Inventory และข้อมูลยอดขาย/จัดซื้อ พร้อมกราฟจาก Chart.js และตัวอย่างหน้าจอ Real-Time Your Money

## Features

- Dashboard พร้อม Sidebar, Header, Notification และ Profile
- Summary card สำหรับ Total Sales, Total Purchase, Total Expenses และ Invoice Due
- กราฟ Sales vs Purchase แบบ Bar Chart พร้อมตัวเลือกช่วงเวลา
- Real Time Chart แบบ Line Chart ที่อัปเดตข้อมูลอัตโนมัติ
- หน้า `yourmoney.html` สำหรับแสดงกราฟ Real-Time พร้อมวันที่และเวลา
- Responsive layout ด้วย Bootstrap 5

## Tech Stack

- HTML5
- Bootstrap 5.3.8 ผ่าน CDN
- Font Awesome 7 ผ่าน CDN
- Chart.js ผ่าน CDN
- Vanilla JavaScript

## Project Structure

```text
.
├── index.html              # หน้า Dashboard หลัก
├── yourmoney.html          # หน้า Real-Time Your Money
├── chart.js                # สร้าง Bar Chart: Sales vs Purchase
├── realtime-chart.js       # สร้าง Line Chart แบบ real-time บน Dashboard
├── script.js               # วันที่/เวลา และ Line Chart ของหน้า yourmoney.html
├── backup.js               # ตัวอย่างการ fetch ข้อมูลจาก data.json
├── data.json               # ข้อมูลตัวอย่าง
└── assets/
    ├── img/                # รูปภาพ, logo, avatar, product images
    └── inventory/          # ไฟล์ asset/template เพิ่มเติม
```

## Getting Started

โปรเจกต์นี้ไม่มีขั้นตอนติดตั้ง dependency เพราะใช้ CDN ทั้งหมด สามารถเปิดใช้งานได้ทันที

### เปิดแบบง่าย

เปิดไฟล์ `index.html` ด้วย Browser

### เปิดผ่าน Local Server

แนะนำให้ใช้ Local Server หากต้องการทดลองส่วนที่มีการ `fetch` ไฟล์ เช่น `backup.js` หรือ `data.json`

ตัวเลือกที่สะดวก:

- ใช้ Extension: Live Server ใน VS Code
- หรือใช้ Python:

```bash
python -m http.server 8000
```

จากนั้นเปิด:

```text
http://localhost:8000
```

## Pages

### `index.html`

หน้า Dashboard หลักของ InMAXX Inventory มีเมนูด้านซ้าย, การ์ดสรุปข้อมูล, notification dropdown, responsive sidebar และกราฟ 2 ส่วน:

- `chart.js`: Bar Chart สำหรับ Sales vs Purchase
- `realtime-chart.js`: Line Chart ที่เพิ่มข้อมูลใหม่อัตโนมัติทุก 3 วินาที

### `yourmoney.html`

หน้าจอแสดงผล Real-Time Your Money ใช้ `script.js` สำหรับ:

- แสดงวันที่ปัจจุบัน
- แสดงเวลาปัจจุบันแบบอัปเดตทุกวินาที
- แสดงกราฟ Line Chart ที่ค่อย ๆ เพิ่มข้อมูลตัวอย่าง

## Development Notes

- ข้อมูลในกราฟตอนนี้เป็น mock data ที่กำหนดไว้ในไฟล์ JavaScript
- ถ้าต้องการต่อ API จริง ให้แก้ส่วนเตรียมข้อมูลใน `chart.js`, `realtime-chart.js` หรือ `script.js`
- `backup.js` เป็นตัวอย่างการอ่าน `data.json` ด้วย `fetch`
- ใน `index.html` มีตัวเลือก `this year` ใน dropdown แต่ `chart.js` ตอนนี้เตรียมข้อมูลไว้สำหรับ `week` และ `month`

## Assets

รูปภาพและโลโก้อยู่ในโฟลเดอร์ `assets/img/` เช่น:

- `logo.svg`
- `work_profile.JPG`
- `avatar-*.jpg`
- `products/product-*.png`

## Author

InMAXX Inventory Dashboard
