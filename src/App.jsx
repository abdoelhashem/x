import { useEffect } from 'react';
import './App.css'
import Messages from './componants/messages'
import Sendbox from './componants/sendbox'
import Container from './container'
import OneSignal from 'react-onesignal';
function App() {
  useEffect(() => {
    if (window.OneSignal) {
      OneSignal.push(function () {
        // تهيئة OneSignal
        OneSignal.init({
          appId: 'ab1fe121-df44-4a43-a3b4-e112444f195a', // استبدل هذا بمعرف التطبيق الخاص بك
          notifyButton: {
            enable: true, // تفعيل زر الإشعارات
            position: 'bottom-left', // وضع الزر
            size: 'small', // حجم الزر
            theme: 'default', // الثيم
            text: 'Click to subscribe!' // النص المعروض على الزر
          }
        });

        // التعامل مع الأخطاء أثناء التسجيل
        OneSignal.on('registrationError', function (error) {
          console.log('حدث خطأ أثناء التسجيل:', error);
          alert('حدث خطأ أثناء محاولة تفعيل الإشعارات.');
        });

        // التعامل مع حالة الاشتراك (هل تم تفعيل الإشعارات؟)
        OneSignal.on('subscriptionChange', function (isSubscribed) {
          if (isSubscribed) {
            console.log('تم تفعيل الإشعارات!');
          } else {
            console.log('تم رفض الإشعارات.');
            alert('لقد رفضت تفعيل الإشعارات. يمكنك تفعيلها مرة أخرى عبر الإعدادات.');
          }
        });

        // عرض نافذة المطالبة بالإشعارات يدويًا
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
