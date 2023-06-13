import { useQuery } from "react-query";
import { getNowPlaying, IMovieDetail } from "../api";

function Playing(){
  const {isLoading, data}= useQuery("allPlaying", getNowPlaying);
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
export default Playing;