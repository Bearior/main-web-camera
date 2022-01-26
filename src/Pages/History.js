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

    window.addEventListener('load', () => {
      Fetchdata();
      console.log("Fetchdata")
    });


    const Fetchdata = ()=>{
      const USERID = userId
      db.collection(USERID).get().then((querySnapshot) => {
          console.log("incollection")
          querySnapshot.forEach(element => {
              var contacts = element.data();
              setInfo(arr => [...arr , contacts]);
              console.log("inSnapshot")
                
          });
      })
  }
    
  
  return (
      <div >
          <center>
          <h3 class="History-font" >History Test</h3> 
          <img src = {pictureUrl}
           style={{width: 200, height: 200, borderRadius: 400/ 2 }} />
           <h1 class="History-font"><d>สวัสดี คุณ </d>{displayName} </h1>
          
          </center>
      {
          info.map((contacts) => (
          <Frame Score={contacts.Score} 
                  Age={contacts.Age} 
                  name={contacts.name}/>
          ))
      }
      </div>

  );
}

const Frame = ({Score, Age , name }) => {
  console.log(Age + " " + Score + " " + name);
      return(
      
          <center>
              <div className="div">
  <p>
  <da>name : {name} {'\n'} </da>
  <da>Age : {Age}{"\n"}</da>
  <da>Score :  {Score}{"\n"}</da>      
  </p>       
              </div>
          </center>
      );
      
  }
  
;

export default History;

