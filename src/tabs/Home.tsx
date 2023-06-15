import { useQuery } from "react-query";
import { IMovieDetail, getPopular, getMovie } from "../api";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useState } from "react";

const Body = styled.section`
height: 100vh;
position: relative;

`;
const Container = styled.div`
position: absolute;
left: 50%;
transform: translateX(-50%);

width: 1200px;
display: grid;
grid-template-columns: repeat(3, 1fr);
border: 1px solid yellow;
row-gap: 40px;
/* padding: 0 20px; */
text-align: center;

`;

const Item = styled(motion.div)`
  margin: auto;
  width: 300px;
  border: 1px solid red;
  overflow: hidden;
  a{
    
    width: inherit;
    height: 300px;
      img{
      width: 100%;
      height: inherit;
      object-fit: cover;
      border-radius: 25px;
    }
  };
  p{
    margin: 10px 0;
    color: #ddd;
    font-size:23px;
    font-weight: 500;
  }
`
interface IdParams {
  id: string;
}
function Home(){
  
  const {isLoading :movieLoading, data: movieData}= useQuery("allMovies", getPopular);
  const location = useLocation();
  const [clicked, setClicked]=useState(false)
  const toggleClick =()=>setClicked((prev)=>!prev)
  return(
    <Body>
      {movieLoading? <p>"loading..."</p>:(
      <Container> 
        {movieData?.results.map((v:IMovieDetail) =>(
      <Item>
        <Link to={`/detail/${v.id}`}  onClick={toggleClick}><img src={`https://image.tmdb.org/t/p/w500${v.backdrop_path}`} /></Link>
        <p key={v.id}>{v.title}</p>
      </Item>
      ))}
      </Container> 
      )}
     
        <Outlet />
     
    </Body>
  );
}
export default Home;