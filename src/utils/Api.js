import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = "24609cc4a0720f67d504242292a8d8bd";

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      params: {
        ...params,
        api_key: TMDB_TOKEN, // Pass the API key as a query parameter
      },
    });
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
};
