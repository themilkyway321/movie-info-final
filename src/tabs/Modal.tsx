import { useQuery } from "react-query";
import { IMovieDetail, getMovie } from "../api";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useLocation, useParams } from "react-router-dom";

interface IdProps {
  clickedMovie: string;
  
}

function Modal({clickedMovie}:IdProps){
  const {isLoading, data}= useQuery(['detail', clickedMovie], () => getMovie(clickedMovie));
  console.log(data, isLoading);
  console.log(clickedMovie)
  return (
<div>
<p>hello</p>
  {isLoading? <p>"loading.."</p>:(
        <div>
          {data?.map((e:IMovieDetail)=>e.revenue)}
        </div>
      )}
</div>
  );
}

export default Modal;