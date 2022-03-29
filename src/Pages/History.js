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
          <Frame Score={contacts.Score} 
                  Age={contacts.Age} 
                  name={contacts.name}
                  Form={contacts.form}
                  Date={contacts.Date}/>
          ))
      }
      
      
      </div>

  );
}

const Frame = ({Score, Age , name, Form, Date }) => {
  console.log(Age + " " + Score + " " + name);
      return(
      
          <center>
              <div className="div">
  <p>
  <da>name : {name} {'\n'} </da>
  <da>Age : {Age}{"\n"}</da>
  <da>Score :  {Score}{"\n"}</da>
  <da>form :  {Form}{"\n"}</da>
  <da>date :  {Date}{"\n"}</da>           
  </p>       
              </div>
          </center>
      );
      
  }
  
;

export default History;

