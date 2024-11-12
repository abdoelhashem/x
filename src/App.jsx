import { useEffect, useState } from 'react';
import './App.css';
import Messages from './componants/messages';
import Sendbox from './componants/sendbox';
import Container from './container';

function App() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // تأكد من تحميل OneSignal أولاً قبل استخدامه
    if (window.OneSignal) {
      // تهيئة OneSignal فقط بعد تحميل السكربت
      window.OneSignal.push(function () {
        window.OneSignal.init({
          appId: 'ab1fe121-df44-4a43-a3b4-e112444f195a', // استبدل بـ appId الخاص بك
          allowLocalhostAsSecureOrigin: true, // يسمح للمطورين بتشغيل الإشعارات على localhost أثناء التطوير
        });

        // التعامل مع الاشتراك/الإلغاء
        window.OneSignal.on('subscriptionChange', function (isSubscribed) {
          setIsSubscribed(isSubscribed);
          if (isSubscribed) {
            // إشعار عندما يتم تفعيل الإشعارات
            console.log('تم تفعيل الإشعارات!');
            alert('تم تفعيل الإشعارات بنجاح!');
          } else {
            // إشعار عندما يتم رفض الإشعارات
            console.log('تم رفض الإشعارات!');
            alert('تم رفض الإشعارات!');
          }
        });

        // عرض المطالبة بعد تفاعل المستخدم مع الموقع
        const userInteracted = localStorage.getItem('userInteracted');
        if (userInteracted) {
          // إذا تفاعل المستخدم بالفعل، اعرض المطالبة
          window.OneSignal.showSlidedownPrompt();
        }

        // إضافة حدث تفاعل من المستخدم
        window.addEventListener('click', () => {
          localStorage.setItem('userInteracted', 'true');
          window.OneSignal.showSlidedownPrompt();
        });
      });
    }

    // التأكد من حالة الاشتراك عند تحميل الصفحة
    window.OneSignal.push(function () {
      window.OneSignal.getSubscription().then(function (isSubscribed) {
        setIsSubscribed(isSubscribed);
      });
    });

  }, []); // تأكد من أن التأثير يحدث مرة واحدة فقط عند تحميل الصفحة

  const handleSendNotification = () => {
    // إرسال إشعار يدويًا
    if (window.OneSignal) {
      window.OneSignal.push(function () {
        window.OneSignal.sendSelfNotification(
          'عنوان الإشعار',
          'محتوى الإشعار',
          'https://your-icon-url.com',
          'https://your-url.com'
        );
      });
    }
  };

  return (
    <div>
      <Container>
        <Sendbox />
      </Container>
      <Container>
        <Messages />
      </Container>

      <div>
        <button onClick={handleSendNotification} disabled={!isSubscribed}>
          إرسال إشعار
        </button>
        <p>{isSubscribed ? 'تم تفعيل الإشعارات' : 'لم تقم بتفعيل الإشعارات بعد'}</p>
      </div>
    </div>
  );
}

export default App;