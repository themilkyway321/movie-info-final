import { useQuery } from "react-query";
import { IMovieDetail, getMovie } from "../api";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

function Modal(){
  const { id } = useParams();
  const {isLoading: detailLoading, data: movieDetail}= useQuery<IMovieDetail>("id", () => getMovie("id"));
  return (
<div>
<p>hello</p>
  {detailLoading? <p>"loading.."</p>:(
        <div>
          {movieDetail?.revenue}
        </div>
      )}
</div>
  );
}

export default Modal;