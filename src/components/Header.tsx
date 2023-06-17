import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import {Link, useMatch} from "react-router-dom";
import styled from "styled-components";

const Container = styled(motion.div)`
 ul{
  display: flex;
  justify-content: center;
  gap: 60px;
  margin: 50px 0;
  font-size: 25px;
  font-weight: bold;
  li a{
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
  const homeMatch = useMatch("/");
  const soonMatch = useMatch("/coming-soon");
  const playingMatch = useMatch("/now-playing");
  const clicked =()=>{
    window.location.reload()
  }

return(
<Container>
      <ul>
      <li
      onClick={clicked}>
        <Link to={"/"} >POPULAR {homeMatch && <Span layoutId="circle" />}</Link> 
      </li>
      <li onClick={clicked}>
        <Link to={"/coming-soon"}>COMING SOON {soonMatch && <Span layoutId="circle" />}</Link>
       </li>
      <li onClick={clicked}>
        <Link to={"/now-playing"}>NOW PLAYING {playingMatch && <Span layoutId="circle" />}</Link>
        </li>
    </ul>

</Container>
);
}
export default Header;