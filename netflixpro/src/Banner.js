import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./Requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  console.log(movie);

  function truncate(str, n) {
      return str?.length > n ? str.substr(0, n-1) + "..." : str;
  }

  return (
    <div>
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: "center center"
      }}
    >
      <div className="banner_content">
        <h1 className="banner_title">{movie?.title || movie?.name || movie?.original_name}</h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h3 className="banner_description">{truncate(movie?.overview, 150)}</h3>
      </div>
      
    </header>
    <div className="banner_fadeBottom"></div>
    </div>
  );
}

export default Banner;

// This component is the header banner we see on screen. It makes an api call to the database
// and randomly selects 1 movie from netflix originals. We set the movie state to this
// randomly selected movie.
