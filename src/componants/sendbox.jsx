import React, { useEffect, useState } from "react";
import "./sendbox.css"
const Sendbox = () => {
    const [invalue,setInvalue] = useState("");
    const [ine,setIne] = useState(true);
    const [ip,setIp] = useState("");
    useEffect(() => {
        fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => setIp(data.ip))
        .catch(error => console.error("حدث خطأ:", error));
    }, [])
    const v = (x) => {
        setInvalue(x.target.value);
        
    }
    const delate_all = () => {
            setIne(false);
            fetch(`https://cors-anywhere.herokuapp.com/https://mrhok.serv00.net/badrphphp/abd5/x3d.php?action=delete_all`, {
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
        </div>

    )

} 

export default Sendbox;
