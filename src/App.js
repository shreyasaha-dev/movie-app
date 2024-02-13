import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import AllMovies from "./AllMovies";
import Details from "./Details";
import { Toaster } from "react-hot-toast";
import { PrivateRoute, PublicRoute } from "./Route";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<AllMovies />} />
          <Route path="/details/:id" element={<Details />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};
export default App;
