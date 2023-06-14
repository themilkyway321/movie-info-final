import { useQuery } from "react-query";
import { IMovieDetail, getMovie } from "../api";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useLocation, useParams } from "react-router-dom";

interface Id {
  id: string;
};
function Modal(){
  
  const {isLoading, data}= useQuery("id", () => getMovie(id));
  console.log(data)
  return (
<div>
<p>hello</p>
  {isLoading? <p>"loading.."</p>:(
        <div>
          {/* {data?.map((e:IMovieDetail)=>e.revenue)} */}
        </div>
      )}
</div>
  );
}

export default Modal;