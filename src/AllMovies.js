import { useContext, useEffect } from "react";
import Movies from "./Movies";
import "./style/AllMovies.css";
import axios from "axios";
import { token } from "./Constant";
import { MovieDataContext } from "./Context";
const AllMovies = () => {
  const [movieData, setMovieData] = useContext(MovieDataContext);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        // console.log(response.data.results);
        setMovieData(response?.data?.results);
      } catch (err) {
        console.log(err);
      }
    };
    getMovies();
  }, []);
  return (
    <div className="movie-section">
      {movieData.map((item) => {
        return (
          <Movies
            key={item.id}
            image={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
            title={item.original_title}
            id={item.id}
          />
        );
      })}
    </div>
  );
};
export default AllMovies;
