import { useQuery } from "react-query";
import { IMovieDetail, getPopular, makeImagePath } from "../api";
import { useEffect } from "react";

function Home(){
  const {isLoading, data}= useQuery("allMovies",getPopular);
  // const image_URL = useQuery("image",()=>makeImagePath(image))

  return(
    <div>
      {isLoading? <p>"loading..."</p>:(
      <div> {data?.results.map((v:any) =>(
      <p key={v.id}>{v.title}</p>
      
      ))}</div> 
      )}
    </div>
  );
}
export default Home;