import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { useState } from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
 ul{
  display: flex;
  justify-content: center;
  gap: 60px;
  margin: 50px 0;
  font-size: 25px;
  font-weight: bold;
  li{
    position: relative;
    width:200px;
    text-align: center;
    
  }
 }
`;
const Span = styled(motion.span)`
width: 10px;
height: 10px;
background-color: red;
border-radius: 50%;
border: 1px solid red;
position: absolute;
top: 50px;
left: 50%;
transform: translateX(-50%);
`;


function Header(){
  const [x, setX] = useState(0);

  
return(
<Container>
  <ul>
    <li>
      <Link to={"/"} onClick={()=>setX(0)}>POPULAR</Link> 
      <Span animate={{ x }} transition={{ duration: 0.15 }}/>
    </li>
    <li>
      <Link to={"/coming-soon"} onClick={()=>setX(260)}>COMING SOON</Link>
      </li>
    <li>
      <Link to={"/now-playing"} onClick={()=>setX(510)}>NOW PLAYING</Link>
      
      </li>
    
  </ul>
</Container>
);
}
export default Header;