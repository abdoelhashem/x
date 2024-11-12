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
        appId: 'أدخل هنا معرف التطبيق الخاص بك', // استبدل بـ App ID الخاص بك
      });
    });

    // عرض مطالبة بالسماح بالإشعارات
    OneSignal.push(function () {
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
