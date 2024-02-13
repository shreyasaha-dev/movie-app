import { createContext, useContext, useState } from "react";

const MovieDataContext = createContext();
const LoginTokenContext = createContext();
const Context = ({ children }) => {
  const [movieData, setMovieData] = useState([]);
  const [loginToken, setLoginToken] = useState(localStorage.getItem("token"));
  return (
    <MovieDataContext.Provider value={[movieData, setMovieData]}>
      <LoginTokenContext.Provider value={[loginToken, setLoginToken]}>
        {children}
      </LoginTokenContext.Provider>
    </MovieDataContext.Provider>
  );
};
export default Context;
export { MovieDataContext, LoginTokenContext };
