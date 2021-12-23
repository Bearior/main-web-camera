import React, { useEffect, useRef, useState } from "react";
import { db } from "./firebase";
import liff from '@line/liff';

const App = () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const stripRef = useRef(null);
  const [userId, setUserId] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [idToken, setIdToken] = useState("");

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


  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error("error:", err);
      });
  };

  const paintToCanvas = () => {
    let video = videoRef.current;
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");

    const width = 320;
    const height = 240;
    photo.width = width;
    photo.height = height;

    return setInterval(() => {
      ctx.drawImage(video, 0, 0, width, height);
    }, 200);
  };

  const takePhoto = (e) => {
    let photo = photoRef.current;
    let strip = stripRef.current;
    

    console.warn(strip);

    const data = photo.toDataURL("image/jpeg");

    console.warn(data);
    console.log("Data:", data)

    const a = document.createElement('a'); 
    a.href = data;
    strip.insertBefore(a, strip.firstChild);
    a.innerHTML = `<img src='${data}' alt='thumbnail'/>`;
    a.download = 'screenshot.jpg';
    document.body.appendChild(a);
    

  db.collection("Images")
      .add({
        picturebase64: data,
      })
  };

  return (
    <div>
      <p><b>Welcome!</b>{displayName}</p>
      <button onClick={takePhoto}>Take a photo</button>
      <video onCanPlay={() => paintToCanvas()} ref={videoRef} />
      <canvas ref={photoRef} />
      <div>
        <div ref={stripRef} />
      </div>
    </div>
  );
};

export default App;
