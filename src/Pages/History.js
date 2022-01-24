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

    window.addEventListener('load', () => {
      Fetchdata();
      console.log("Fetchdata")
    });

  // Fetch the required data using the get() method
  const Fetchdata = ()=>{
      db.collection(UserID).get().then((querySnapshot) => {
          console.log("incollection")
          // Loop through the data and store
          // it in array to display
          querySnapshot.forEach(element => {
              const contacts = element.data();
              setInfo(arr => [...arr , contacts]);
              console.log("inSnapshot")
                
          });
      })
  }
  // Display the result on the page
  return (
    <div>
        <center>
        <h3>NewsProof</h3> 
        </center>
    {
        info.map((contacts) => (
        <Frame Age={contacts.Age} 
               gender={contacts.gender} 
               name={contacts.name}/>
        ))
    }
    </div>

);
}

// Define how each display entry will be structured
const Frame = ({Age , gender , name }) => {
console.log(Age + " " + text + " " + AI);
if(Status == "read"){
    
    console.log("inif")
    return(
    
        <center>
            <div className="div">
<p>age : {Age}%</p>
<p>gender :  {gender}</p>       
<p>name :  {name}</p>       
            </div>
        </center>
    );
    
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

    </div>
    )
    
}
export default History;

