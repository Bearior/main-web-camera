import React, { useEffect } from "react";


const FBT = () => {
    window.open("https://main-web-camera.vercel.app/FBT", "_self", "")
    const Close = ()=>{
    window.close();
}
return(
 <center>
     <p>ลงการนัดหมายสำเร็จ</p>
     <button onClick={Close}>กดเพื่อปิดหน้านี้</button>
 </center>
);


};
export default FBT;