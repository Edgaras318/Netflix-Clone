import React, { useState, useEffect } from 'react'
import axiosInstance from '../axios';
import requests from '../requests';
import '../components/Banner.css'

function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axiosInstance.get(requests.fetchNetflixOriginals);
            let randomNr = Math.floor(Math.random() * request.data.results.length);
            setMovie(
                request.data.results[randomNr]
            );
            return request;
        }
        fetchData();
    },[])

    //console.log(movie);
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
      }

    return (
    <header className="banner"
        style={{
            backgroundSize: "cover",
            backgroundImage: `url(
                "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
            )`,
            backgroundPosition: "center center"
        }}
        >
         <div className="banner__contents">
            {/* some films eather give you title or name or original_name */}
            {/* .? optional channing */}
             <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>

            <div className="banner_buttons">
                <button className="banner__button">Play</button>
                <button className="banner__button">My List</button>
            </div>
            <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
         </div>
         <div className="banner--fadeBottom" />  
    </header>
    )
}

export default Banner
