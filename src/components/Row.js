import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import "./Row.css";
import YouTube from 'react-youtube';

const base_url = "https://image.tmdb.org/t/p/original"

function Row({ title, fetchUrl, isLargeRow, trailerUrl, getURL, setTrailer, setMovieIdState, state}) {
    const [movies, setMovies] = useState([]);

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
    
    return (
        <div className="row">
            <h2>{title}</h2>
            <div className={"row__posters"}>
                {movies.map(movie => (

                    <img
                     key={movie.id}
                     className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                     onClick={() => {getURL(movie);
                                     setTrailer(title, movie.id);
                                     setMovieIdState(movie.id);
                                     }}
                     src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt ={`${movie.id}`}/>
                ))}
            </div>
            {state === title && <YouTube videoId={trailerUrl} opts={opts} />}
            {/* {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />} */}
        </div>
    )
}

export default Row
