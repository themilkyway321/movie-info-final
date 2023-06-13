import { useQuery } from "react-query";
import { getComingSoon, IMovieDetail } from "../api";


function Soon(){
  const {isLoading, data}= useQuery("allComing", getComingSoon);
  return(
    <div>
      {isLoading? <p>"loading..."</p>:(
      <div> {data?.results.map((v:IMovieDetail) =>(
      <div>
        <p key={v.id}>{v.title}</p>
        <img src={`https://image.tmdb.org/t/p/w500${v.backdrop_path}`} />
      </div>
      ))}</div> 
      )}
    </div>
  );
}
export default Soon;