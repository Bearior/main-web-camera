import React, { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import Form1 from "../Picture/Form1.png"
import Form2 from "../Picture/Form2.jpg"
import Swal from 'sweetalert2'
import liff from '@line/liff';



const Contact = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [sight2, setSight2] = useState("");
    const [gender, setGender] = useState("");
    const [sight, setSight] = useState("");
    const [sight3, setSight3] = useState("");
    const [sight4, setSight4] = useState("");
    const [sight5, setSight5] = useState("");
    const [sight6, setSight6] = useState("");
    const [sight7, setSight7] = useState("");
    const [com, setCom] = useState("");
    const [userId, setUserId] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [idToken, setIdToken] = useState("");
    const [loader, setLoader] = useState(false);
    var A = 0
    var B = 1
    var C = 2

    let navigate = useNavigate();

    const initLine = () => {
      liff.init({ liffId: '1656554390-BDkoRm7V' }, () => {
        if (liff.isLoggedIn()) {
          runApp();
        } else {
          liff.login();
        }
      }, err => console.error(err));
    }
    const runApp = () => {
      const idToken = liff.getIDToken();
      setIdToken(idToken);
      liff.getProfile().then(profile => {
        console.log(profile);
        setDisplayName(profile.displayName);
        setUserId(profile.userId);
      }).catch(err => console.error(err));
    }
    useEffect(() => {
      initLine();
    }, []);
  
  
    

    const handleSubmit = (e) => {
      e.preventDefault();
      setLoader(true);
        
      const UserID = userId

          setLoader(false);
          Swal.fire({
            title: 'คุณแน่ใจหรือไม่?',
            text: 'ถ้าแน่ใจแล้วกดใช่เลย!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33', 
            confirmButtonText: 'ใช่!',
            cancelButtonText:'ยกเลิก'
            }).then((result) => {
              if (result.isConfirmed){
                console.log("in If")
                Swal.fire('แบบฟอร์มของคุณเสร็จแล้ว!', '', 'success' )
                const All = sight+sight2+sight3+sight4+sight5+sight6+sight7
                db.collection("users").doc().collection(UserID)
                .add({
                name: name,
                Age: age,
                gender: gender,
                Score: All,
                com: com,
                UserID: UserID,
                }).then(() =>{
                  navigate("./History")
                })
              }
             
         })
        
  
  
        .catch((error) => {
          alert(error.message);
          setLoader(false);
        });
  
      setName("");
      setAge("");
      setSight2("");
      setGender("");
      setSight("");
      setSight3("");
      setSight4("");
      setSight5("");
      setSight6("");
      setSight7("");
      setCom("");
    };
  
    
  
    return (
      <form class="form" onSubmit={handleSubmit}>
       
        
      
        <h2>แบบสอบถามเกี่ยวกับโรคต้อกระจก</h2>
        <h1><d>สวัสดี คุณ </d>{displayName}<f> โปรดตอบตามความจริงเพื่อผลประโยช์นสูงสุดของทั้งสองฝ่าย</f></h1>
  
        <label>ชื่อ - สกุล</label>
        <input
          placeholder="ชื่อ-นามสกุล"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
  
        <label>โปรดใส่อายุของคุณ</label>
        <input
          placeholder="ใส่อายุของคุณ"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        
        <label >เลือกเพศสภาพของคุณ</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} required >
          <option value="">โปรดเลือก</option>
          <option value="Men">ชาย</option>
          <option value="Women">หญิง</option>
          <option value="Others">อื่นๆ</option>
        </select>
  
        <label>ตอนนี้ท่านมองเห็นได้ชัดหรือไม่</label>
        <img src={Form1} alt="Logo" />
        <select
          value={sight}
          onChange={(e) => setSight(e.target.value)} required  >
          <option value="">โปรดเลือก</option>
          <option value="0">ชัด</option>
          <option value="2">ไม่ชัด</option>
          <option value="1">ไม่แน่ใจ</option>
        </select>
  
        <label>ท่านมีอาการคันตาหรือไม่ ภายใน3วันนี้</label>
        <select
          value={sight2}
          onChange={(e) => setSight2(e.target.value)} required >
          <option value="">โปรดเลือก</option>
          <option value="1">มี</option>
          <option value="0">ไม่มี</option>
        </select>
  
        <label> มีจุดดำๆหรือมัวๆอยู่บนตาของท่านหรือไม่ </label>
        <img src={Form2} alt="Logo" />
        <select
          value={sight3}
          onChange={(e) => setSight3(e.target.value)} required >
          <option value="">โปรดเลือก</option>
          <option value="2">มี</option>
          <option value="0">ไม่มี</option>
          <option value="1">ไม่แน่ใจ</option>
        </select>
  
        <label> ก่อนท่านจะมาใช้บริการของทางเรา ท่านเคยไปพบหมอดวงตามาก่อนหรือไม่ </label>
        <select
          value={sight4}
          onChange={(e) => setSight4(e.target.value)} required >
          <option value="">โปรดเลือก</option>
          <option value="0">เคย</option>
          <option value="1">ไม่เคย</option>
        </select>
  
        <label> ท่านเคยประสบอุบัติเหตุที่ทำให้เกิดการกระแทกแบบรุนแรงหรือไม่ </label>
        <select
          value={sight5}
          onChange={(e) => setSight5(e.target.value)} required >
          <option value="">โปรดเลือก</option>
          <option value="2">เคย</option>
          <option value="0">ไม่เคย</option>
        </select>
  
        <label> จากอุบัติเหตุที่กล่าวมานั้น ทำให้สภาพการมองเห็นของท่านเปลี่ยนไปหรือไม่ </label>
        <select
          value={sight6}
          onChange={(e) => setSight6(e.target.value)} required >
          <option value="">โปรดเลือก</option>
          <option value="2">ใช่</option>
          <option value="0">ไม่ใช่</option>
          <option value="1">ไม่แน่ใจ</option>
        </select>
  
        <label> ท่านเคยผ่าตัดโรคที่เกี่ยวกับดวงตาหรือไม่ </label>
        <select
          value={sight7}
          onChange={(e) => setSight7(e.target.value)} required >
          <option value="">โปรดเลือก</option>
          <option value="0">เคย</option>
          <option value="2">ไม่เคย</option>
        </select>
  
        <label>ข้อเสนอแนะ</label>
        <input
          placeholder="ความคิดเห็นของคุณ"
          value={com}
          onChange={(e) => setCom(e.target.value)}
        />
  
        <button
          type="submit"
        >

          เสร็จสิ้น
        </button>
      </form>
      
    );
  };
  
  export default Contact;