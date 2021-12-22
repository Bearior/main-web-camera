import React, { useEffect, useRef } from "react";
import { db } from "./firebase"

const App = () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const stripRef = useRef(null);

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

  // const handleUpload = () => {
  //   const uploadTask = storage.ref(`images/${image.name}`).put(image);
  //   uploadTask.on(
  //     "state_changed",
  //     snapshot => {
  //       const progress = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       );
  //       setProgress(progress);
  //     },
  //     error => {
  //       console.log(error);
  //     },
  //     () => {
  //       storage
  //         .ref("images")
  //         .child(image.name)
  //         .getDownloadURL()
  //         .then(url => {
  //           setUrl(url);
  //         });
  //     }
  //   );
  // };

  const takePhoto = (e) => {
    let photo = photoRef.current;
    let strip = stripRef.current;
    

    console.warn(strip);

    const data = photo.toDataURL("image/jpeg");

    console.warn(data);
    console.log("Data:", data)
    // const link = document.createElement("a");
    // link.href = data;
    // link.setAttribute("download", "myWebcam");
    // link.innerHTML = `<img src='${data}' alt='thumbnail'/>`;
    // strip.insertBefore(link, strip.firstChild);

    const a = document.createElement('a'); 
    a.href = data;
    strip.insertBefore(a, strip.firstChild);
    a.innerHTML = `<img src='${data}' alt='thumbnail'/>`;
    a.download = 'screenshot.jpg';
    document.body.appendChild(a);
    a.click();
    

    db.collection("Images")
      .add({
        picturebase64: data,
      })
    

    // const uploadTask = storage.ref(`images/${image.name}`).put(image);
    


  };

  return (
    <div>
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
