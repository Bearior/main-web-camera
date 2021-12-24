import React, { useState } from "react";
import "./App.css";
import { db } from "../firebase";
import Form1 from "../Picture/Form1.png"
import Form2 from "../Picture/Form2.jpg"

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sight2, setSight2] = useState("");
  const [gender, setGender] = useState("");
  const [sight, setSight] = useState("");
  const [sight3, setSight3] = useState("");
  const [sight4, setSight4] = useState("");
  const [sight5, setSight5] = useState("");
  const [sight6, setSight6] = useState("");

  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("users")
      .add({
        name: name,
        email: email,
        gender: gender,
        Sight: sight,
        Sight2: sight2,
        Sight3: sight3,
        Sight4: sight4,
        Sight5: sight5,
        Sight6: sight6,
      })
      .then(() => {
        setLoader(false);
        alert("Your message has been submitted👍");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    setName("");
    setEmail("");
    setSight2("");
    setGender("");
    setSight("");
    setSight3("");
    setSight4("");
    setSight5("");
    setSight6("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Please fill the form </h2>

      <label>ชื่อ - สกุล</label>
      <input
        placeholder="Name-Surname"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>โปรดใส่อายุ</label>
      <input
        placeholder="Age"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      <label>เลือกเพศสภาพของคุณ</label>
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}>
        <option value="Noinput">Please Select</option>
        <option value="Men">ชาย</option>
        <option value="Women">หญิง</option>
        <option value="Others">อื่นๆ</option>
      </select>

      <label>ตอนนี้ท่านมองเห็นได้ชัดหรือไม่</label>
      <img src={Form1} alt="Logo" />
      <select
        value={sight}
        onChange={(e) => setSight(e.target.value)}>
        <option value="Noinput">Please Select</option>
        <option value="ชัด">ชัด</option>
        <option value="ไม่ชัด">ไม่ชัด</option>
        <option value="ไม่แน่ใจ">ไม่แน่ใจ</option>
      </select>

      <label>ท่านมีอาการคันตาหรือไม่ ภายใน3วันนี้</label>
      <select
        value={sight2}
        onChange={(e) => setSight2(e.target.value)}>
        <option value="Noinput">Please Select</option>
        <option value="มี">มี</option>
        <option value="ไม่มี">ไม่มี</option>
      </select>

      <label> มีจุดดำๆหรือมัวๆอยู่บนตาของท่านหรือไม่ </label>
      <img src={Form2} alt="Logo" />
      <select
        value={sight3}
        onChange={(e) => setSight3(e.target.value)}>
        <option value="Noinput">Please Select</option>
        <option value="มี">มี</option>
        <option value="ไม่มี">ไม่มี</option>
        <option value="ไม่แน่ใจ">ไม่แน่ใจ</option>
      </select>

      <label> ก่อนท่านจะมาใช้บริการของทางเรา ท่านเคยไปพบหมอดวงตามาก่อนหรือไม่ </label>
      <select
        value={sight4}
        onChange={(e) => setSight4(e.target.value)}>
        <option value="Noinput">Please Select</option>
        <option value="เคย">เคย</option>
        <option value="ไม่เคย">ไม่เคย</option>
      </select>

      <label> ท่านเคยประสบอุบัติเหตุที่ทำให้เกิดการกระแทกแบบรุนแรงหรือไม่ </label>
      <select
        value={sight5}
        onChange={(e) => setSight5(e.target.value)}>
        <option value="Noinput">Please Select</option>
        <option value="เคย2">เคย</option>
        <option value="ไม่เคย2">ไม่เคย</option>
      </select>

      <label> จากอุบัติเหตุที่กล่าวมานั้น ทำให้สภาพการมองเห็นของท่านเปลี่ยนไปหรือไม่ </label>
      <select
        value={sight6}
        onChange={(e) => setSight6(e.target.value)}>
        <option value="Noinput">Please Select</option>
        <option value="ใช่">ใช่</option>
        <option value="ไม่ใช่">ไม่ใช่</option>
        <option value="ไม่แน่ใจ">ไม่แน่ใจ</option>
      </select>


      <label>Radio input test</label>
      <radio  
        onchange ={(e) => setSight(e.target.value)}
        value={sight} > 
        <p><input type="radio" value="3" name="sight" /> option1  </p>   
        <p><input type="radio" value="2" name="sight" /> option2  </p>   
        <p><input type="radio" value="1" name="sight" /> option3  </p>   
      </radio>

      <button
        type="submit"
        style={{ background: loader ? "#ccc" : " rgb(2, 2, 110)" }}
      >
        Submit
      </button>
    </form>
  );
};

export default Contact;
