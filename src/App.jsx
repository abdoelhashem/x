import { useEffect } from 'react';
import './App.css'
import Messages from './componants/messages'
import Sendbox from './componants/sendbox'
import Container from './container'
import OneSignal from 'react-onesignal';
function App() {
  useEffect(() => {
    // تهيئة OneSignal
    OneSignal.init({
      appId: 'ab1fe121-df44-4a43-a3b4-e112444f195a', // ضع الـ App ID الخاص بك هنا
    }).then(() => {
      console.log("تم تهيئة OneSignal");
    });

    // إظهار مطالبة السماح بالإشعارات
    OneSignal.push(() => {
      OneSignal.showSlidedownPrompt();
    });

    // الاستماع لإظهار الإشعار
    OneSignal.on('notificationDisplay', (event) => {
      console.log('تم عرض الإشعار:', event);
    });

    // الاستماع لنقرات الإشعار
    OneSignal.on('notificationClick', (event) => {
      console.log('تم النقر على الإشعار:', event);
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
