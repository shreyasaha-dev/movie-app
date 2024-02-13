import { useNavigate } from "react-router-dom";
import "./style/Movies.css";
const Movies = ({ image, title, id }) => {
  const navigate = useNavigate();
  const goToDetails = () => {
    navigate(`/details/${id}`);
  };
  return (
    <div className="movies" onClick={goToDetails}>
      <img src={image} />
      <h4>{title}</h4>
    </div>
  );
};
export default Movies;
