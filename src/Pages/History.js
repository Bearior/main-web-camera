import React, { useState, useEffect } from "react";
import liff from '@line/liff';
import "./App.css"
import { db } from "../firebase";

const History = () => {
    const [userId, setUserId] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [idToken, setIdToken] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");
    const [name , setName] = useState("");

    const UserID = userId

    db.collection(UserID)
      .get()
      .then( snapshot => {
        const name = []
        snapshot.forEach( doc => {
          const data = doc.data()
          name.push(data)
        })
      })
     setName(name)

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

    </div>
    )
    
}
export default History;

