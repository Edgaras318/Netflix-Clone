import './App.css';
import Row from './components/Row';
import requests from './requests';
import Banner from './components/Banner';
import Nav from './components/Nav';
import movieTrailer from 'movie-trailer';
import React, { useState } from 'react';
//import YouTube from 'react-youtube';

function App() {
  const [trailerUrl, setTrailerUrl] = useState('');

  const [state, setState] = useState('');
  const [movieId, setMovieId] = useState('');

const setMovieIdState = (movie) => {
  if(movieId !== movie){
    setMovieId(movie);
  }
  else{
    setMovieId('');
  }
    //setMovieId(movie);
    //console.log('movie: '+movie);
   // console.log('movie id: '+movieId);
}


  const setTrailer = (title, mvID) => {
    if(movieId === mvID && title === state){
      setState('');
    }
    else{
      setState(title);
    }
  //  console.log('mvId: '+mvID);
   // console.log('movie id2: '+movieId);
  }

  const getURL = (movie) => {
    // console.table(movie?.title)
  //  console.log(movie.title);
   // console.log('Prev url: '+ prevCount);
   // console.log('Current url: '+trailerUrl);
    // if (trailerUrl) {
    //   setTrailerUrl('')
    // } else {
      movieTrailer(movie?.name || movie?.title || movie?.original_title || '')
        .then(url => {
           // console.log(url);
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
        }).catch((error) => {
          setState('');
          alert("This trailer doest exist in movie trailer API!");
        })
    //}
  }

  return (
    <div className="app">
    <Nav />
    <Banner />
    <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} trailerUrl={trailerUrl} getURL={getURL} setTrailer={setTrailer} setMovieIdState={setMovieIdState} state={state} isLargeRow/>
    <Row title="Trending Now" fetchUrl={requests.fetchTrending} trailerUrl={trailerUrl} getURL={getURL} setTrailer={setTrailer} setMovieIdState={setMovieIdState} state={state}/>
    <Row title="Top Rated" fetchUrl={requests.fetchTopRated} trailerUrl={trailerUrl} getURL={getURL} setTrailer={setTrailer} setMovieIdState={setMovieIdState} state={state}/>
    <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} trailerUrl={trailerUrl} getURL={getURL} setTrailer={setTrailer} setMovieIdState={setMovieIdState} state={state}/>
    <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} trailerUrl={trailerUrl} getURL={getURL} setTrailer={setTrailer} setMovieIdState={setMovieIdState} state={state}/>
    <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} trailerUrl={trailerUrl} getURL={getURL} setTrailer={setTrailer} setMovieIdState={setMovieIdState} state={state}/>
    <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} trailerUrl={trailerUrl} getURL={getURL} setTrailer={setTrailer} setMovieIdState={setMovieIdState} state={state}/>
    <Row title="Documenteries" fetchUrl={requests.fetchDocumentaries} trailerUrl={trailerUrl} getURL={getURL} setTrailer={setTrailer} setMovieIdState={setMovieIdState} state={state}/>
    </div>
  );
}

export default App;
