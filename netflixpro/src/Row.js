import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import Carousel from 'react-elastic-carousel';

const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  // A snippet of code which runs based on a specific condition/var
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]); // must include dependency when we fetch something

  const breakPoints = [
    
    {width: 1000, itemsToShow: isLargeRow? 6 : 5, itemsToScroll: isLargeRow? 6 : 5},
    {width: 1400, itemsToShow: isLargeRow? 7 : 6, itemsToScroll: isLargeRow? 7 : 6},
  ]

  

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        
      <Carousel breakPoints={breakPoints} itemPadding={[10, 10]} >
          {movies.map((movie) => (
              <div className="posters">
                <img
                  key={movie.id}
                  className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                  src={`${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                />
              </div>
              
           
          ))}
          </Carousel>
      </div>
    </div>
  );
}

export default Row;
