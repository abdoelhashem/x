import "./messages.css";
import Container from '../container'
import { useEffect, useState } from "react";
function Messages() {
    const [data,setData] = useState([]);
    const [loader,setLoader] = useState(true);
    const [aler,setAler] = useState("");
    const [inp,setInp] = useState("");

    useEffect(() => {
        fetch("https://cors-anywhere.herokuapp.com/http://mrhok.serv00.net/badrphphp/abd5/messages.json").then(response => response.json()).then(arr => {
            setData(arr);
            setLoader(false)
            console.log(arr);
            
        })
    },[])


    const remov = (id) => {
        fetch(`https://cors-anywhere.herokuapp.com/https://mrhok.serv00.net/badrphphp/abd5/x3d.php?action=delete&id=${id}`).then(res => res.json()).then(d => {
            window.location.reload();
        })
    }
    
    function timeAgo(date) {
        // الحصول على التوقيت الحالي في توقيت القاهرة
        const currentTime = new Date().toLocaleString("en-US", { timeZone: "Africa/Cairo" });
        const cairoTime = new Date(currentTime);
        
        // إنشاء تاريخ الرسالة في توقيت القاهرة
        const messageTime = new Date(`${date.month} ${date.day_of_month}, ${date.year} ${date.time_24hr}`);
        messageTime.setHours(messageTime.getHours() + 1); // تقليل ساعة واحدة
        
        const elapsed = cairoTime - messageTime;
    
        const seconds = Math.floor(elapsed / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30); 
        const years = Math.floor(days / 365); 
    
        if (seconds < 60) {
            return `منذ ${seconds} ثانية`;
        } else if (minutes < 60) {
            return `منذ ${minutes} دقيقة`;
        } else if (hours < 24) {
            return `منذ ${hours} ساعة`;
        } else if (days < 7) {
            return `منذ ${days} يوم`;
        } else if (weeks < 4) {
            return `منذ ${weeks} أسبوع`;
        } else if (months < 12) {
            return `منذ ${months} شهر`;
        } else {
            return `منذ ${years} سنة`;
        }
    }
    
    
    

    return (
        <div>
            <div className={`w-full h-full ${aler != "" ? "fixed" : "hidden"} z-[777] bg-slate-200 top-0 left-0`}>
                <Container p="fixed vc z-[999] w-[250px] ">
                <div>
                <h1>اكتب الرد</h1>
        
                <textarea onInput={(x) => {
                    setInp(x.target.value)
                }} className="input-box" placeholder="اكتب ردك هنا..." rows="3"></textarea>
                <div className="flex justify-end">

                <div className="gap-2 flex">
                    <button className="reply-btn" onClick={() => {
                        fetch(`https://cors-anywhere.herokuapp.com/https://mrhok.serv00.net/badrphphp/abd5/x3d.php?action=edit&key=show&newtxt=true&id=${aler}`).then(res => res.json()).then(d => {
                        })
                        fetch(`https://cors-anywhere.herokuapp.com/https://mrhok.serv00.net/badrphphp/abd5/x3d.php?action=edit&key=reply&newtxt=${inp}&id=${aler}`).then(res => res.json()).then(d => {
                            window.location.reload();
                        })
                    }}>رد</button>
                    <button className="reply-btn" onClick={() => setAler("")}>الغاء</button>
                </div>
            </div>
                </div>
                </Container>
            </div>
        <h1>الرسائل</h1>
        <div className={`${loader ? "flex" : "hidden"} items-center flex-col`}>
           <div className="loader"></div>
           <h3 className="message-content">جار تحميل الرسائل...</h3>
        </div>
        {data.map((x,i) => (
            <div className="message-box" key={i}>
                <div className="message-footer">
                <span>{timeAgo(x.date)}</span>
            </div>
            <div className="message-box" >
            <p className="">{x.message}</p>
            </div>
            <div className="flex justify-between">
            <button className="reply-btn">من؟</button>
            <button onClick={() => {
                fetch(`https://cors-anywhere.herokuapp.com/https://mrhok.serv00.net/badrphphp/abd5/x3d.php?action=edit&key=show&newtxt=false&id=${x.id}`).then(res => res.json()).then(d => {
                    fetch(`https://cors-anywhere.herokuapp.com/https://mrhok.serv00.net/badrphphp/abd5/x3d.php?action=edit&key=reply&newtxt=&id=${x.id}`).then(res => res.json()).then(d => {
                    window.location.reload()
                    
                    })
                    
                })
                
            }} className={`reply-btn ${x.show == "true" ? "block" : "hidden"}`}>اخفاء</button>
                <div className="gap-2 flex">
                    <button className="reply-btn" onClick={() => {setAler(x.id)}}>رد</button>
                    <button className="reply-btn" onClick={() => remov(x.id)}>حذف</button>
                </div>
            </div>
            {x.reply == "" ? "" : <><div className="message-footer">
                    الرد :
                </div><div className="message-box">
                        <p className="">{x.reply}</p>
                    </div></>}
            </div>
            
        ))}
        
        
    </div>
    )
  }
  
  export default Messages