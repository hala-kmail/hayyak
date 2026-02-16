# دليل إعداد نظام التصويت باستخدام بصمة الجهاز

## نظرة عامة

تم تحديث نظام التصويت لاستخدام تقنية بصمة الجهاز (Device Fingerprinting) بدلاً من التحقق عبر رقم الهاتف. يستخدم النظام مكتبة FingerprintJS لتوليد معرف فريد لكل جهاز/متصفح.

## المتطلبات

### 1. قاعدة البيانات PostgreSQL

يجب تثبيت وتشغيل PostgreSQL على الخادم.

```bash
# مثال على تثبيت PostgreSQL (Ubuntu/Debian)
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib

# إنشاء قاعدة البيانات
sudo -u postgres createdb hayyak
```

### 2. Redis

يستخدم Redis كـ cache سريع للتحقق من التصويتات المكررة.

```bash
# مثال على تثبيت Redis (Ubuntu/Debian)
sudo apt-get install redis-server

# تشغيل Redis
sudo systemctl start redis-server
```

### 3. متغيرات البيئة

أنشئ ملف `.env.local` في جذر المشروع واملأه بالمتغيرات التالية:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hayyak
DB_USER=postgres
DB_PASSWORD=your_password_here

REDIS_URL=redis://localhost:6379
```

## إعداد قاعدة البيانات

بعد تشغيل PostgreSQL، سيتم إنشاء الجداول تلقائياً عند أول طلب للـ API. يمكنك أيضاً تشغيل الاستعلامات التالية يدوياً:

```sql
CREATE TABLE IF NOT EXISTS votes (
  id SERIAL PRIMARY KEY,
  town_id VARCHAR(255) NOT NULL,
  fingerprint_hash VARCHAR(64) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_fingerprint_hash ON votes(fingerprint_hash);
CREATE INDEX IF NOT EXISTS idx_town_id ON votes(town_id);
CREATE INDEX IF NOT EXISTS idx_created_at ON votes(created_at);
```

## كيفية العمل

### الواجهة الأمامية (Frontend)

1. **استخدام Hook `useFingerprint`**:
   - يتم توليد بصمة الجهاز تلقائياً عند تحميل الصفحة
   - يتم تخزين البصمة في `sessionStorage` لتجنب إعادة توليدها

2. **إرسال التصويت**:
   - عند النقر على زر التصويت، يتم إرسال `townId` و `fingerprint` إلى `/api/votes`
   - يتم التعامل مع الأخطاء وعرض رسائل مناسبة للمستخدم

### الخادم (Backend)

1. **استقبال الطلب**:
   - API route: `POST /api/votes`
   - يتلقى `townId` و `fingerprint` في جسم الطلب

2. **التحقق من التكرار**:
   - يتم تجزئة البصمة باستخدام SHA-256
   - التحقق السريع في Redis (cache)
   - التحقق النهائي في قاعدة البيانات PostgreSQL

3. **تخزين التصويت**:
   - إذا لم يكن التصويت مكرراً، يتم تخزينه في قاعدة البيانات
   - يتم تخزين البصمة المجزأة في Redis مع فترة انتهاء (30 يوم)

## الأمان والخصوصية

- **تجزئة البصمة**: يتم تجزئة البصمة باستخدام SHA-256 قبل التخزين
- **لا معلومات شخصية**: لا يتم جمع أو تخزين أي معلومات شخصية عن المستخدم
- **Redis كـ Cache**: يستخدم Redis فقط للتحقق السريع، قاعدة البيانات هي المصدر الأساسي

## الاعتبارات المهمة

1. **وضع التصفح الخاص**: قد يغير البصمة، مما يسمح بالتصويت مرة أخرى
2. **مسح بيانات المتصفح**: قد يغير البصمة
3. **متصفحات مختلفة**: كل متصفح على نفس الجهاز يعطي بصمة مختلفة
4. **هذه الآلية مناسبة لاستبيانات الرأي البسيطة** وليست للأنظمة التي تتطلب أماناً عالياً

## اختبار النظام

1. تأكد من تشغيل PostgreSQL و Redis
2. قم بتشغيل المشروع: `npm run dev`
3. افتح المتصفح وانتقل إلى صفحة التصويت
4. جرب التصويت - يجب أن يعمل بنجاح
5. جرب التصويت مرة أخرى من نفس المتصفح - يجب أن يظهر رسالة "لقد قمت بالتصويت مسبقاً"

## استكشاف الأخطاء

### خطأ في الاتصال بقاعدة البيانات
- تأكد من تشغيل PostgreSQL
- تحقق من صحة بيانات الاتصال في `.env.local`

### خطأ في الاتصال بـ Redis
- تأكد من تشغيل Redis
- تحقق من صحة `REDIS_URL` في `.env.local`
- ملاحظة: النظام سيعمل حتى لو فشل Redis (سيعتمد على قاعدة البيانات فقط)

### خطأ في توليد البصمة
- تأكد من أن المتصفح يدعم JavaScript
- تحقق من console المتصفح للأخطاء

## الملفات المهمة

- `app/hooks/useFingerprint.ts` - Hook لتوليد بصمة الجهاز
- `app/components/home/VoteModal.tsx` - مكون واجهة التصويت
- `app/api/votes/route.ts` - API endpoint للتصويت
- `lib/fingerprint.ts` - Utilities لتجزئة البصمة
- `lib/redis.ts` - Utilities للتعامل مع Redis
- `lib/db.ts` - Utilities للتعامل مع PostgreSQL
