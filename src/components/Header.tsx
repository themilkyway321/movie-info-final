import { motion, useMotionValue } from "framer-motion";
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
margin-top: 50%;
left: 50%;
transform: translateX(-50%);
`;
function Header(){
  const x = useMotionValue(0);
  
  // const tab = useTransform(x,[0,190,400])
return(
<Container>
  
  <ul>
    <li><Link to={"/"} onClick={()=>x.set(0)}>POPULAR<Span style={{x}} drag="x" dragSnapToOrigin></Span></Link></li>
    <li><Link to={"/coming-soon"} onClick={()=>x.set(190)}>COMING SOON</Link></li>
    <li><Link to={"/now-playing"} onClick={()=>x.set(400)}>NOW PLAYING</Link></li>
  </ul>
</Container>
);
}
export default Header;