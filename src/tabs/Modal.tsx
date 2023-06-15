import { useQuery } from "react-query";
import { IMovieDetail, getMovie } from "../api";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useLocation, useParams } from "react-router-dom";

interface Id {
  id: string;
};
function Modal(){
  const location = useLocation();
  const  {id}  = useParams();
  // const {isLoading, data}= useQuery(['detail', id], () => getMovie(id));
 
  return (
<div>
<p>hello</p>
  {/* {isLoading? <p>"loading.."</p>:(
        <div>
          {data?.map((e:IMovieDetail)=>e.revenue)}
        </div>
      )} */}
</div>
  );
}

export default Modal;