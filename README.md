# پروژه Tailwind CSS — نمونه

این پروژه شامل یک تنظیم پایه برای Tailwind CSS است.

## فایل‌ها
- `package.json` — اسکریپت‌های npm برای توسعه و بیلد
- `tailwind.config.cjs` — پیکربندی Tailwind
- `postcss.config.cjs` — پیکربندی PostCSS
- `src/input.css` — ورودی CSS برای Tailwind
- `index.html` — صفحه نمونه که از `dist/output.css` استفاده می‌کند

## استفاده
1. nodejs (نسخه 16+) را نصب کنید.
2. در پوشه پروژه:
```bash
npm install
```
3. برای توسعه (با watch):
```bash
npm run dev
```
این دستور فایل `dist/output.css` را تولید و در حالت نظارت نگه می‌دارد.

4. برای تولید یک نسخه مینیمایز شده:
```bash
npm run build
```

پس از اجرای یکی از دستورات بالا، فایل CSS در `dist/output.css` قرار می‌گیرد و `index.html` آن را بارگذاری می‌کند.

نکته: اگر نمی‌خواهید از npm استفاده کنید، می‌توانید به‌صورت موقت از CDN نسخه‌ی Play استفاده کنید: `<script src="https://cdn.tailwindcss.com"></script>` اما پروژه‌ی حاضر برای یک جریان کاری محلی با Tailwind ساخته شده است.
