import { useQuery } from "react-query";
import { IMovieDetail, getPopular, getMovie } from "../api";
import styled from "styled-components";
import { AnimatePresence, motion,  useAnimationControls, useMotionValueEvent, useScroll } from "framer-motion";
import { Link, Outlet, useLocation, useMatch, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { get } from "http";


const Body = styled.section`
height: 200vh;
position: relative;

`;
const Container = styled(motion.div)`
position: absolute;
left: 50%;
transform: translateX(-50%);

width: 1200px;
display: grid;
grid-template-columns: repeat(3, 1fr);
border: 1px solid yellow;
row-gap: 100px;
/* padding: 0 20px; */
text-align: center;

`;

const Item = styled(motion.div)`
  margin: auto;
  width: 300px;
  height: 380px;
    img{
      border-radius: 15px;
        width: inherit;
        height: inherit;
        object-fit: cover;
      };
    p{

      margin: 5px 0;
      color: #ddd;
      font-size:23px;
      font-weight: 500;
    };
`;

const BigMovie = styled(motion.div)`
  position:absolute; 
  width:40vw;
  height:60vh; 
  left:0;
  right:0;
  margin:auto;

  border-radius: 15px ;
overflow: hidden;
`;
const BigCover = styled.div`
width: 100%;
background-size: cover;
background-position: center center;
height: 500px;

`;
const Overlay = styled(motion.div)`
position: fixed;
top: 0;
width: 100%;
height: 100vh;
background-color:rgba(0,0,0,0.5) ;
opacity: 0;
`;
const BigTitle = styled.h2`

font-size: 28px;
position: relative;
top: -60px;
padding: 10px;
`;
const BigOverview =styled.p`
position: relative;
top: -50px;
padding: 10px;
`;
const boxVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration:0.5,
      staggerChildren: 0.2
    },
  },
};
const itemVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
};


function Home(){
  const {scrollY}=useScroll();
  const navigate = useNavigate();
  const controls = useAnimationControls();
  const homeMovieMatch =useMatch("/detail/:id");
  
  const {isLoading :movieLoading, data: movieData}= useQuery("allMovies", getPopular);
  
  const location = useLocation();
  const [clicked, setClicked]=useState(false)
  const toggleClick =()=>setClicked((prev)=>!prev);
  const onItemClicked =(id:number)=>{
    navigate(`/detail/${id}`)
  };
  const onOverlayClicked =()=>navigate(`/`);
  const clickedMovie = homeMovieMatch?.params.id && movieData?.results.find((e: { id: string; })=>e.id+"" === homeMovieMatch.params.id);
  const {isLoading :detailLoading, data: detailData}= useQuery("id", ()=>getMovie(clickedMovie));
  useEffect(() => {
  controls.start("show");
  
  }, [movieLoading]);
  return(
    <Body>
      <AnimatePresence>
        {movieLoading? <p>"loading..."</p>:(
        <Container variants={boxVars} initial="hidden" animate={controls}>  
          {movieData?.results.map((v:IMovieDetail) =>(
        <Item
        variants={itemVariants}
        
        key={v.id}
        layoutId={v.id+""}   
        onClick={()=>onItemClicked(v.id)}>
          <img src={`https://image.tmdb.org/t/p/w500${v.backdrop_path}`} />
          <p key={v.id}>{v.title}</p>
        </Item>
        ))}
        </Container> 
        )}
      </AnimatePresence>
     
      <AnimatePresence>
      {homeMovieMatch? 
      (<>
      <Overlay onClick={onOverlayClicked} animate={{opacity:1}} exit={{opacity:0}}/>
        <BigMovie layoutId={homeMovieMatch.params.id} style={{ top:scrollY.get()+100}}>
            {clickedMovie &&
            <>
            <BigCover style={{backgroundImage:`linear-gradient(to top, black, transparent),url(https://image.tmdb.org/t/p/original/${clickedMovie.backdrop_path})` }} />
            
            <BigTitle>{clickedMovie.title}</BigTitle>
            <BigOverview>{clickedMovie.overview}</BigOverview>
            </>
            }
        </BigMovie>
      
      
      </>):null}
      
      
      
      </AnimatePresence>
     
     
    </Body>
  );
}
export default Home;