import { useQuery } from "react-query";
import { IMovieDetail, getPopular } from "../api";


function Home(){
  const {isLoading, data: movieData}= useQuery("allMovies", getPopular);
  return(
    <div>
      {isLoading? <p>"loading..."</p>:(
      <div> {movieData?.results.map((v:IMovieDetail) =>(
      <div>
        <p key={v.id}>{v.title}</p>
        <img src={`https://image.tmdb.org/t/p/w500${v.backdrop_path}`} />
      </div>
      ))}</div> 
      )}
    </div>
  );
}
export default Home;