import { useQuery } from "react-query";
import { IMovieDetail, getPopular, getMovie } from "../api";
import styled from "styled-components";
import { AnimatePresence, motion,  useScroll } from "framer-motion";
import { useLocation, useMatch, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { NumericFormat } from 'react-number-format';

const Body = styled.section`
width: 100%;
position: relative;
display: flex;
justify-content: center;

`;
const Container = styled(motion.div)`
position: absolute;
justify-content: center;
align-items: center;
width: 1200px;
display: grid;
grid-template-columns: repeat(3, 1fr);
row-gap: 100px;
/* padding: 0 20px; */
text-align: center;
padding-bottom: 200px;
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
    :hover{
      cursor: pointer;
    } 
`;
const Overlay = styled(motion.div)`
position: fixed;
top: 0;
width: 100%;
height: 100vh;
background-color:rgba(0,0,0,0.5) ;
opacity: 0;
`;
const BigMovie = styled(motion.div)`
  position:fixed; 
  width:1000px;
  height:70vh; 
  left:0;
  right:0;
  margin:auto;
  border-radius: 15px ;
  overflow: hidden;
  background-color:rgba(0,0,0,0.9) ;
  
`;
const BigCover = styled(motion.div)`
width: 100%;
height: 70%;
background-size: cover;
background-position: center center;
`;

const BigTitle = styled.h2`
font-size: 28px;
position: relative;
top: -60px;
padding: 30px;
`;
const BigOverview =styled.p`
position: relative;
top: -50px;
padding: 0 30px;
`;

const BigList = styled.ul`
position: absolute;
bottom:0;
line-height: 1.3em;
padding: 30px;
`;
// const boxVars = {
//   start:{
//     y:0,
//     opacity:1,
//     scale:1
//     },
//   show: { 
//     transition: { staggerChildren: 0.1 } 
//     },
//     hide: { 
//     transition: { staggerChildren: 0.1, staggerDirection: -1 } 
//     },
// };
// const itemVariants = {
//   normal:{
//   y:0,
//   opacity:1,
//   scale:1
//   },
//   show: { 
//     y: [200, 0], 
//     opacity: [0, 1], 
//     scale: [0.95, 1] 
//     },
//     hide: { 
//     y: [0, 200],
//     opacity: [1, 0],
//     scale: [1, 0.95]
//     },
// };

const BoxVariants = {
  normal:{
    scale:1,
  },
  hover:{
    scale:1.3,
    transition:{
      duration:0.3,
      type:"tween"
    }
  },
};

function Home(){
 
  const [leaving, setLeaving]= useState(false);
  const toggleLeaving =()=>setLeaving((prev)=>!prev);
  const {scrollY}=useScroll();
  const navigate = useNavigate();
  const homeMovieMatch =useMatch("/detail/:id");
  
  const {isLoading :movieLoading, data: movieData}= useQuery("allMovies", getPopular);
  
 
  const onItemClicked =(id:number)=>{
      navigate(`/detail/${id}`,{state: {id}})

  };
  const onOverlayClicked =()=>navigate(`/`);
  const clickedMovie = homeMovieMatch?.params.id && movieData?.results.find((e: { id: string; })=>e.id+"" === homeMovieMatch.params.id);

useEffect(()=>{

},[])



  const {id} = useParams();
  const {data: detailData}= useQuery<IMovieDetail>(["detail", id], ()=>getMovie(id+""));

  return(
    <Body>
      <AnimatePresence mode="wait">
        {movieLoading? <p>"loading..."</p>:(
        <Container>  
          {movieData?.results.map((v:IMovieDetail) =>(
          <Item 
           variants={BoxVariants}
           whileHover="hover"
           onClick={()=>onItemClicked(v.id)}
            layoutId={v.id+""}>
              <img src={`https://image.tmdb.org/t/p/w500${v.backdrop_path}`} />
              <p key={v.id}>{v.title}</p>
            </Item>
        ))}
        </Container> 
        )}
      </AnimatePresence>
     
      <AnimatePresence mode="wait">
      {homeMovieMatch? 
      (<>
      <Overlay onClick={onOverlayClicked} animate={{opacity:1}} exit={{opacity:0}}/>
        <BigMovie layoutId={homeMovieMatch.params.id} >
            {clickedMovie &&
            <>
            <BigCover initial={{opacity:0}} animate={{opacity:1,transition:{duration:0.3, delay:0.4}}} style={{backgroundImage:`linear-gradient(to top, black, transparent),url(https://image.tmdb.org/t/p/original/${clickedMovie.backdrop_path})` }} />
            <BigTitle>{clickedMovie.title}</BigTitle>
            <BigOverview>{clickedMovie.overview}</BigOverview>
            <BigList>
              <li>Budget: <NumericFormat
                              value={detailData?.budget}
                              displayType={'text'}
                              thousandSeparator=","
                              prefix={'$'}
                              renderText={(value) => <b>{value}</b>}
                            />
              </li>
              <li> Revenue: <NumericFormat
                              value={detailData?.revenue}
                              displayType={'text'}
                              thousandSeparator=","
                              prefix={'$'}
                              renderText={(value) => <b>{value}</b>}
                            />
              </li>
              <li>Runtime: {detailData?.runtime}</li>
              <li>Rating: {detailData?.vote_average}</li>
              <li>Homepage: {detailData?.homepage}</li>
            </BigList>
            </>
            }
        </BigMovie>
      </>):null}
      </AnimatePresence>
     
     
    </Body>
  );
}
export default Home;