import React, { useState, useEffect } from "react";
import liff from '@line/liff';






const History = () => {
    const [userId, setUserId] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [idToken, setIdToken] = useState("");


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
    }).catch(err => console.error(err));
  }
  useEffect(() => {
    initLine();
  }, []);

    return(
    <div>
        AROI
        <h1><d>สวัสดี คุณ </d>{displayName} </h1>
        
        
        
        
    
    
    </div>
    
    )
    
}
export default History;

