import { useEffect } from 'react';
import './App.css'
import Messages from './componants/messages'
import Sendbox from './componants/sendbox'
import Container from './container'
import OneSignal from 'react-onesignal';
function App() {
  useEffect(() => {
    // تهيئة OneSignal فقط بعد تحميل السكربت
    if (window.OneSignal) {
      OneSignal.push(function () {
        OneSignal.init({
          appId: 'أدخل هنا معرف التطبيق الخاص بك',  // استبدله بـ App ID الخاص بك
        });
      });

      // عرض مطالبات الإشعارات
      OneSignal.push(function () {
        OneSignal.showSlidedownPrompt();
      });
    }
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
