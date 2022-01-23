import React, { useState, useEffect } from "react";
import liff from '@line/liff';
import "./App.css"
import Bg from "../Picture/Hbg.jpg"
import { db } from "../firebase";






const History = () => {
    const [userId, setUserId] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [idToken, setIdToken] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");
    const [info , setInfo] = useState([]);

    const UserID = userId

    window.addEventListener('load', () => {
      Fetchdata();
      console.log("Fetchdata")
    });

    const Fetchdata = ()=>{
      db.collection(UserID).get().then((querySnapshot) => {
          console.log("incollection")
          // Loop through the data and store
          // it in array to display
          querySnapshot.forEach(element => {
              var data = element.data();
              setInfo(arr => [...arr , data]);
              console.log("inSnapshot")
                
          });
      })
  }


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

    return(
    <div class="History-font" >
        <img src = {pictureUrl}
        style={{width: 200, height: 200, borderRadius: 400/ 2 }} />
        <h1  >
          <d>สวัสดี คุณ </d>{displayName} </h1>

          {
            info.map((contacts) => (
            <Frame title={contacts.title} 
                   text={contacts.text} 
                   AI={contacts.AI}
                   Status={contacts.status}/>
            ))
        }
        
    </div>
    
    )
    
}
export default History;

