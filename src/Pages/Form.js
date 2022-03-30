import React, { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import Form1 from "../Picture/Form1.png"
import Form2 from "../Picture/Form2.jpg"
import Swal from 'sweetalert2'
import liff from '@line/liff';

  // #⣿⡇⣿⣿⣿⠛⠁⣴⣿⡿⠿⠧⠹⠿⠘⣿⣿⣿⡇⢸⡻⣿⣿⣿⣿⣿⣿⣿ # //
  // #⢹⡇⣿⣿⣿⠄⣞⣯⣷⣾⣿⣿⣧⡹⡆⡀⠉⢹⡌⠐⢿⣿⣿⣿⡞⣿⣿⣿ # //
  // #⣾⡇⣿⣿⡇⣾⣿⣿⣿⣿⣿⣿⣿⣿⣄⢻⣦⡀⠁⢸⡌⠻⣿⣿⣿⡽⣿⣿ # //
  // #⡇⣿⠹⣿⡇⡟⠛⣉⠁⠉⠉⠻⡿⣿⣿⣿⣿⣿⣦⣄⡉⠂⠈⠙⢿⣿⣝⣿ # //
  // #⠤⢿⡄⠹⣧⣷⣸⡇⠄⠄⠲⢰⣌⣾⣿⣿⣿⣿⣿⣿⣶⣤⣤⡀⠄⠈⠻⢮ # //
  // #⠄⢸⣧⠄⢘⢻⣿⡇⢀⣀⠄⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡀⠄⢀ # //
  // #⠄⠈⣿⡆⢸⣿⣿⣿⣬⣭⣴⣿⣿⣿⣿⣿⣿⣿⣯⠝⠛⠛⠙⢿⡿⠃⠄⢸ # //
  // #⠄⠄⢿⣿⡀⣿⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⣿⣿⡾⠁⢠⡇⢀ # //
  // #⠄⠄⢸⣿⡇⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣏⣫⣻⡟⢀⠄⣿⣷⣾ # //
  // #⠄⠄⢸⣿⡇⠄⠈⠙⠿⣿⣿⣿⣮⣿⣿⣿⣿⣿⣿⣿⣿⡿⢠⠊⢀⡇⣿⣿ # // 
  // #⠒⠤⠄⣿⡇⢀⡲⠄⠄⠈⠙⠻⢿⣿⣿⠿⠿⠟⠛⠋⠁⣰⠇⠄⢸⣿⣿⣿ # //

const Contact = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [sight2, setSight2] = useState("");
    const [gender, setGender] = useState("");
    const [date, setDate] = useState("");
    const [sight, setSight] = useState("");
    const [sight3, setSight3] = useState("");
    const [sight4, setSight4] = useState("");
    const [sight5, setSight5] = useState("");
    const [sight6, setSight6] = useState("");
    const [sight7, setSight7] = useState("");
    const [Call, setCall] = useState("");
    const [com, setCom] = useState("");
    const [userId, setUserId] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [idToken, setIdToken] = useState("");
    const [info , setInfo] = useState([]);
    const [loader, setLoader] = useState(false);
    const UserID = userId
    const [Picscore, setPicscore] = useState("");
    const [userDetails, setUserDetails] = useState([])
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
    
    

    const Fetchdata = ()=>{
      
      db.collection('PicRe').doc(UserID).get()
      .then(querysnapshot => querysnapshot.forEach(element => {
        var Score = element.data();
        setUserDetails(arr => [...arr , Score]);
        console.log(userDetails)
      }));
    }
  
  
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
                const Qref = db.collection("Queue");
                Qref.doc(userId).add({
                name: name,
                Age: age,
                gender: gender,
                call: Call,
                time: sight,
                type: sight2,
                UserID: UserID,
                Date: date,
                status: "ยังไม่ได้ยืนยันการนัด"
                }).then(() =>{               
                  navigate("./FBT");
                });
              };
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
      setDate("");
      // setSight3();
      // setSight4();
      // setSight5();
      // setSight6();
      // setSight7();
      // setCom("");
      setCall("");
    };
  
    return (
      <form class="form" onSubmit={handleSubmit}>

        <h2>แบบสอบถามเพื่อจองคิวรับการตรวจ</h2>
        <h1><d>สวัสดี คุณ </d>{displayName}<f> กรุณากรอกแบบฟอร์มข้างล่างเพื่อที่ทางโรงพยาบาลจะได้ติดต่อไป </f></h1>
  
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

        <label>โปรดระบุวันที่ที่ต้องการเข้าพบแพทย์</label>
        <input
          placeholder="ระบุวันที่ ว/ด/ป"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label>โปรดระบุเบอร์โทรศัพท์ที่ติดต่อได้</label>
        <input
          placeholder="ระบุเบอร์โทรศัพท์ที่ติดต่อได้"
          value={Call}
          onChange={(e) => setCall(e.target.value)}
          required
        />
        
        <label >เลือกเพศสภาพของคุณ</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} required >
          <option value="">โปรดเลือก</option>
          <option value="Men">ชาย</option>
          <option value="Women">หญิง</option>
          <option value="Others">อื่นๆ</option>
        </select>
  
        <label>กรุณาเลือกเวลาที่ต้องการเข้าพบแพทย์</label>
        <select
          value={sight}
          onChange={(e) => setSight(e.target.value)} required  >
          <option value="">โปรดเลือก</option>
          <option value="06.00-09.00">06.00-09.00</option>
          <option value="10.00-12.00">10.00-12.00</option>
          <option value="13.00-15.00">13.00-15.00</option>
          <option value="15.00-19.00">15.00-19.00</option>
        </select>
  
        <label>ต้องการพบแพทย์เนื่องจากมีอาการอย่างไร</label>
        <select
          value={sight2}
          onChange={(e) => setSight2(e.target.value)} required >
          <option value="">โปรดเลือก</option>
          <option value="สมองและระบบประสาท">ปวดหัว, มีไข้</option>
          <option value="หัวใจและหลอดเลือด">ปวดหน้าอก มีโรคประจำตัวเกี่ยวกับหัวใจ</option>
          <option value="ลำไส้และทางเดินอาหาร">ปวดท้อง, ปวดบิด, เจ็บกระเพราะ</option>
          <option value="กระดูกและข้อ">ปวดหลัง, มีปัญหาข้อเข่า</option>
        </select>
  
        {/* <label> มีจุดดำๆหรือมัวๆอยู่บนตาของท่านหรือไม่ </label>
        <img src={Form2} alt="Logo" />
        <select
          value={sight3}
          onChange={(e) => setSight3(e.target.value)} required >
          <option value="">โปรดเลือก</option>
          <option value={2}>มี</option>
          <option value={0}>ไม่มี</option>
          <option value={1}>ไม่แน่ใจ</option>
        </select> */}
  
        {/* <label> ก่อนท่านจะมาใช้บริการของทางเรา ท่านเคยไปพบหมอดวงตามาก่อนหรือไม่ </label>
        <select
          value={sight4}
          onChange={(e) => setSight4(e.target.value)} required >
          <option value="">โปรดเลือก</option>
          <option value={0}>เคย</option>
          <option value={1}>ไม่เคย</option>
        </select>
  
        <label> ท่านเคยประสบอุบัติเหตุที่ทำให้เกิดการกระแทกแบบรุนแรงหรือไม่ </label>
        <select
          value={sight5}
          onChange={(e) => setSight5(e.target.value)} required >
          <option value="">โปรดเลือก</option>
          <option value={2}>เคย</option>
          <option value={0}>ไม่เคย</option>
        </select>
  
        <label> จากอุบัติเหตุที่กล่าวมานั้น ทำให้สภาพการมองเห็นของท่านเปลี่ยนไปหรือไม่ </label>
        <select
          value={sight6}
          onChange={(e) => setSight6(e.target.value)} required >
          <option value="">โปรดเลือก</option>
          <option value={2}>ใช่</option>
          <option value={0}>ไม่เคยประสบอุบัติเหตุ</option>
          <option value={1}>ไม่แน่ใจ</option>
        </select>
  
        <label> ท่านเคยผ่าตัดโรคที่เกี่ยวกับดวงตาหรือไม่ </label>
        <select
          value={sight7}
          onChange={(e) => setSight7(e.target.value)} required >
          <option value="">โปรดเลือก</option>
          <option value={0}>เคย</option>
          <option value={2}>ไม่เคย</option>
        </select>
  
        <label>ข้อเสนอแนะ</label>
        <input
          placeholder="ความคิดเห็นของคุณ"
          value={com}
          onChange={(e) => setCom(e.target.value)}
        /> */}
  
        <button
          type="submit"
          onClick={Fetchdata}
        >

          เสร็จสิ้น
        </button>
      </form>
      
    );
  };
  
  export default Contact;