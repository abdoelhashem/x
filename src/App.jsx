import { useEffect, useState } from 'react';
import './App.css';
import Messages from './componants/messages';
import Sendbox from './componants/sendbox';
import Container from './container';

function App() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (window.OneSignal) {
      console.log('OneSignal is loaded');
      // تهيئة OneSignal
      window.OneSignal.push(function () {
        window.OneSignal.init({
          appId: '57196203-d4da-4192-852d-f8adf84cd921', // استبدل بـ appId الخاص بك
          allowLocalhostAsSecureOrigin: true, // يسمح للمطورين بتشغيل الإشعارات على localhost أثناء التطوير
        });

        // التحقق من حالة الاشتراك عند تحميل الصفحة
        window.OneSignal.getSubscription().then(function (isSubscribed) {
          console.log('Subscription status:', isSubscribed);
          setIsSubscribed(isSubscribed);
        });

        // التعامل مع الاشتراك/الإلغاء
        window.OneSignal.on('subscriptionChange', function (isSubscribed) {
          console.log('Subscription changed:', isSubscribed);
          setIsSubscribed(isSubscribed);
          if (isSubscribed) {
            alert('تم تفعيل الإشعارات بنجاح!');
          } else {
            alert('تم رفض الإشعارات!');
          }
        });
      });
    } else {
      console.error('OneSignal is not loaded!');
    }
  }, []); // التأكد من أن التأثير يحدث مرة واحدة فقط عند تحميل الصفحة

  const handleRequestNotifications = () => {
    if (window.OneSignal) {
      console.log('Requesting notifications...');
      window.OneSignal.push(function () {
        // تحقق إذا كانت المطالبة ستظهر أم لا
        window.OneSignal.getSubscription().then(function (isSubscribed) {
          if (!isSubscribed) {
            console.log('Before showing prompt');
            window.OneSignal.showSlidedownPrompt(); // عرض المطالبة للمستخدم إذا لم يكن مشتركًا
            console.log('Prompt shown');
          } else {
            console.log('User is already subscribed');
          }
        });
      });
    } else {
      console.error('OneSignal is not initialized!');
    }
  };

  const handleSendNotification = () => {
    if (window.OneSignal) {
      window.OneSignal.push(function () {
        window.OneSignal.sendSelfNotification(
          'عنوان الإشعار',
          'محتوى الإشعار',
          'https://your-icon-url.com', // ضع رابط الأيقونة
          'https://your-url.com' // ضع رابط الموقع عند الضغط على الإشعار
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
        <button onClick={handleRequestNotifications}>
          طلب الإشعارات
        </button>
        <button onClick={handleSendNotification} disabled={!isSubscribed}>
          إرسال إشعار
        </button>
        <p>{isSubscribed ? 'تم تفعيل الإشعارات' : 'لم تقم بتفعيل الإشعارات بعد'}</p>
      </div>
    </div>
  );
}

export default App;