import "./style/Cast.css";
const Cast = ({ image, name }) => {
  return (
    <div className="cast-section">
      <img src={image} />
      <p>{name}</p>
    </div>
  );
};
export default Cast;
