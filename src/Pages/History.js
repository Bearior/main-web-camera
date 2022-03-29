import React, { useState, useEffect } from "react";
import liff from '@line/liff';
import "./App.css"
import { db } from "../firebase";

const History = () => {
    const [userId, setUserId] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [idToken, setIdToken] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");
    const [info , setInfo] = useState([]);

    const initLine = () => {
      liff.init({ liffId: '1656554390-E4AwKpm8' }, () => {
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
        setPictureUrl(profile.pictureUrl);
      }).catch(err => console.error(err));
    }
    useEffect(() => {
      initLine();
      
    }, []);
    

    var i = true ;
    const Fetchdata = ()=>{
      if(i===true){

        db.collection("Queue").where("UserID", "==", userId).get().then((querySnapshot) => {
          console.log("incollection")
          querySnapshot.forEach(element => {
              var contacts = element.data();
              setInfo(arr => [...arr , contacts]);
              console.log("inSnapshot")
                i=false;
              
          });
      })
      
      }
  }
    
  return (
      <div class = "history">
          <center class = "center">
              <h3 class="History-font" >History</h3> 
              <img src = {pictureUrl} 
              style={{width: 200, height: 200}} />
           </center> 
           <h1><h2>สวัสดี คุณ </h2>{displayName} </h1>
           <center>
            <button class="loadbtn" onClick={Fetchdata}>คลิกเพื่อดูประวัติการนัดแพทย์</button>
           </center>
           
          
      {
          info.map((contacts) => (
          <Frame call={contacts.call} 
                  Age={contacts.Age} 
                  name={contacts.name}
                  time={contacts.time}
                  Date={contacts.Date}
                  type={contacts.type}/>
          ))
      }
      
      </div>

  );
}

const Frame = ({call, Age , name, time, Date, type }) => {
  const Confirm = () =>{
    alert("ยืนยันเรียบร้อย กรุณารอการตอบกลับจากโรงพยาบาลผ่านหมายเลขโทรศัพท์")
  }
      return(      
          <center>
              <div className="div">
  <p>
  <da>ชื่อ-สกุล : {name} {'\n'} </da>
  <da>อายุ : {Age}{"\n"}</da>
  <da>เบอร์โทรศัพท์ : {call}{"\n"}</da>
  <da>เวลา :  {time}{"\n"}</da>
  <da>ประเภท :  {type}{"\n"}</da>
  <da>วันที่ :  {Date}{"\n"}</da>   
  <button class="confirmbtn" onClick={Confirm}>ยืนยัน</button> <button>ยกเลิก</button>        
  </p>       
  
              </div>
          </center>
      );
      
  }
  
;

export default History;

