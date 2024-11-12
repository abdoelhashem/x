import { useEffect } from 'react';
import './App.css'
import Messages from './componants/messages'
import Sendbox from './componants/sendbox'
import Container from './container'
import OneSignal from 'react-onesignal';
function App() {
  useEffect(() => {
    // تأكد من تحميل OneSignal أولاً قبل استخدامه
    if (window.OneSignal) {
      // تهيئة OneSignal فقط بعد تحميل السكربت
      window.OneSignal.push(function () {
        window.OneSignal.init({
          appId: '57196203-d4da-4192-852d-f8adf84cd921',  // استبدل بـ appId الخاص بك من لوحة تحكم OneSignal
          allowLocalhostAsSecureOrigin: true, // يسمح للمطورين بتشغيل الإشعارات على localhost أثناء التطوير
        });

        // التعامل مع الاشتراك/الإلغاء
        window.OneSignal.on('subscriptionChange', function (isSubscribed) {
          if (isSubscribed) {
            console.log('تم تفعيل الإشعارات!');
          } else {
            console.log('تم رفض الإشعارات!');
          }
        });

        // إظهار المطالبة لتنشيط الإشعارات
        window.OneSignal.showSlidedownPrompt();
      });
    }
  }, []); // تأكد من أن التأثير يحدث مرة واحدة فقط عند تحميل الصفحة
  return (
    <div>
      <Container>
        <Sendbox />
      </Container>
      <Container >
        <Messages />
      </Container>

    </div>
  )
}

export default App
