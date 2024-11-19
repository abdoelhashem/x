import React, { useEffect, useState } from "react";
import "./sendbox.css"
const Sendbox = () => {
    const [invalue,setInvalue] = useState("");
    const [ine,setIne] = useState(true);
    const [ip,setIp] = useState("");
    const [vist,setVist] = useState("");
    useEffect(() => {
        

        fetch('https://abdoelhashem.pythonanywhere.com/views')
        .then(response => response.json())
        .then(data => setVist(data.view))
        .catch(error => console.error("حدث خطأ:", error));
    }, [])
    const v = (x) => {
        setInvalue(x.target.value);
        
    }
    const delate_all = () => {
            setIne(false);
            fetch(`https://abdoelhashem.pythonanywhere.com/delete_all`, {
  method: 'GET',
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'If-Modified-Since': new Date().toISOString()
  }
}).then(b => {
                window.location.reload()
            })
    }
    return (
        <div>
            <h1>ازالة جميع الرسائل</h1>
    
            
            <button className="send-btn" onClick={delate_all}>{ine ? 'delate all' : <div className="flex justify-center"><div class="loader vv"></div></div>}</button>
            <div className="message-footer">الزيارات : {vist}</div>
        </div>

    )

} 

export default Sendbox;
