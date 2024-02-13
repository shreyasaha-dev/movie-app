import { useParams } from "react-router-dom";
import Cast from "./Cast";
import "./style/Details.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { token } from "./Constant";
import { Circles } from "react-loader-spinner";
const Details = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const [castData, setCastData] = useState([]);
  const [isLoadedName, setIsLoadedName] = useState(false);
  const [isLoadedCast, setIsLoadedCast] = useState(false);
  const [isErrorName, setIsErrorName] = useState(false);
  const [isErrorCast, setIsErrorCast] = useState(false);
  const params = useParams();
  useEffect(() => {
    const getDetails = async () => {
      try {
        const result = await axios.get(
          `https://api.themoviedb.org/3/movie/${params.id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(result.data);
        setMovieDetails(result?.data);
        setIsLoadedName(true);
      } catch (err) {
        console.log(err);
        setIsLoadedName(true);
        setIsErrorName(true);
      }
    };
    const castdetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${params.id}/credits`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(response.data.cast);
        setCastData(response?.data?.cast);
        setIsLoadedCast(true);
      } catch (error) {
        console.log(error);
        setIsLoadedCast(true);
        setIsErrorCast(true);
      }
    };
    getDetails();
    castdetails();
  }, [params]);
  return isLoadedCast && isLoadedName ? (
    <div className="total-details-section">
      {isErrorName ? (
        <p className="error">Can't fetch movie details right now..!</p>
      ) : (
        <div className="top-section">
          <div className="left-section">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`}
            />
          </div>
          <div className="right-section">
            <h2>{movieDetails?.original_title}</h2>
            <p>{movieDetails?.overview}</p>
          </div>
        </div>
      )}
      {isErrorCast ? (
        <p className="error">Can't fetch cast right now..!</p>
      ) : (
        <div className="bottom-section">
          <h3>The Cast</h3>
          <div className="all-cast-section">
            {castData.map((item) => {
              return (
                <Cast
                  key={item?.id}
                  image={
                    item?.profile_path
                      ? `https://image.tmdb.org/t/p/w500${item?.profile_path}`
                      : "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"
                  }
                  name={item?.name}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  ) : (
    <span className="loader">
      <Circles
        height="70"
        width="70"
        color="purple"
        ariaLabel="circles-loading"
        visible={true}
      />
    </span>
  );
};
export default Details;
