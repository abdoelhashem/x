import { useEffect } from 'react';
import './App.css'
import Messages from './componants/messages'
import Sendbox from './componants/sendbox'
import Container from './container'
import OneSignal from 'react-onesignal';
function App() {
  useEffect(() => {
    // تهيئة OneSignal
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(function () {
      OneSignal.init({
        appId: 'ab1fe121-df44-4a43-a3b4-e112444f195a',  // استبدل بـ appId الخاص بك من لوحة تحكم OneSignal
        allowLocalhostAsSecureOrigin: true, // يسمح للمطورين بتشغيل الإشعارات على localhost أثناء التطوير
      });
    });

    // التعامل مع الاشتراك/الإلغاء
    OneSignal.push(function () {
      OneSignal.on('subscriptionChange', function (isSubscribed) {
        if (isSubscribed) {
          console.log('تم تفعيل الإشعارات!');
        } else {
          console.log('تم رفض الإشعارات!');
        }
      });

      // إظهار المطالبة لتنشيط الإشعارات
      OneSignal.showSlidedownPrompt();
    });

  }, []);
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
