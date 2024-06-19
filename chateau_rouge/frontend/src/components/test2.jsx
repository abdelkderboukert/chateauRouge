// import React, {useState} from 'react';
// import { motion } from "framer-motion";

// const Test2 = () => {
//     const [stat, setStat] = useState(false);
//     const [balit, setBalit] = useState([])
    
//     return (
//       <div
//         style={{
//           display: "grid",
//           placeContent: "center",
//           height: "100vh",
//           gap: "0.8rem",
//           background: "black",
//         }}
//       >
//         <motion.div
//           onClick={() => 
//             {setStat(!stat)
//               setBalit(balit=>[...balit, {id:1,name:"moh"}])
//               console.log(balit)
//             }
//           }
//           layout
//           style={{
//             borderRadius: "10px",
//             backgroundColor: "#f4f4f4f4",
//             height: "50px",
//             width: "250px",
//             marginBottom: "20px",
//             color: "#ffff",
//           }}
//           whileHover={{
//             rotate: "-2.5deg",
//             scale: 1.05,
//             opacity: 0.1,
//           }}
//         >
//           <motion.span 
//           style={{ 
//             opacity: 1,
//           }}
//           whileHover={{
//             opacity: 1,
//           }}
//            >
//             click me
//           </motion.span>
//         </motion.div>
//         {stat && (
//           <motion.div
//             style={{
//               height: 0,
//               width: 0,
//               background: "green",
//             }}
//             initial={{
//               height: 0,
//               width: 0,
//               rotate: "0deg",
//             }}
//             animate={{
//               height: 250,
//               width: 250,
//               rotate: "180deg",
//               borderRadius: "30px",
//             }}
//             exit={{
//               height: 0,
//               width: 0,
//               rotate: "0deg",
//             }}
//             variants={{}}
//             transition={{
//               duration: 0.5,
//             }}
//           ></motion.div>
//         )}
//         {/* <motion.div
//           style={{
//             height: 150,
//             width: 150,
//             background: "black",
//           }}
//           initial={{
//             rotate: "0deg",
//           }}
//           animate={{
//             rotate: "180deg",
//           }}
//           exit={{
//             rotate: "0deg",
//           }}
//           variants={{}}
//           transition={{
//             duration:1
//           }}
//         ></motion.div> */}
//       </div>
//     );
// }

// export default Test2;

import React, { useState } from "react";
import { motion } from "framer-motion";

function Test2() {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(true);
  };

  const divVariants = {
    hidden: { opacity: 0, x: "100vw" },
    visible: { opacity: 1, x: 0, transition: { duration: 2, ease: "easeInOut" } }
  };

  return (
    <div className="App">
      <div>
        <button onClick={handleClick}>Click me</button>
      </div>
      <motion.div
        className="div2"
        variants={divVariants}
        initial="hidden"
        animate={animate? "visible" : "hidden"}
      >
        <h1>Div 2</h1>
        <p>This is Div 2 content.</p>
      </motion.div>
    </div>
  );
}


export default Test2;