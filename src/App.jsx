import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/Api";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import SearchResult from "./Pages/SearchResult/SearchResult";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./App/HomeSlice";
import Header from "./Component/Header/Header";
import Footer from "./Component/Footer/Footer";
import Details from "./Pages/Details/Details";


function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  console.log("🚀 ~ App ~ url:", url)

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
        promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    console.log(data);
    data.map(({ genres }) => {
        return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
};


  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/:mediaType/:id"} element={<Details />} />
          <Route path={"/search/:query"} element={<SearchResult />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
