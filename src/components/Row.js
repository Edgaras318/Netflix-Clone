import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import "./Row.css";
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original"

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    // A snippet of code which based on a specific condition/variable
    useEffect(() =>{
        async function fetchData() {
            const request = await axiosInstance.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
          autoplay: 1,
        }
      }
      
      const handleClick = (movie) => {
        // console.table(movie?.title)
        console.log(movie.title);
        console.log(movie.name);
        console.log(movie);
        if (trailerUrl) {
          setTrailerUrl('')
        } else {
          movieTrailer(movie?.name || movie?.title || movie?.original_title || '')
            .then(url => {
                console.log(url);
              const urlParams = new URLSearchParams(new URL(url).search);
              setTrailerUrl(urlParams.get('v'));
            }).catch((error) => alert("This trailer doest exist in movie trailer API!"));
        }
      }
    
    return (
        <div className="row">
            <h2>{title}</h2>
            <div className={"row__posters"}>
                {movies.map(movie => (
                    <img
                     key={movie.id}
                     className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                     onClick={() => handleClick(movie)}
                     src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt ="move.name"/>
                ))}
            </div>
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
