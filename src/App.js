/*global swal*/

import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import AlbumCover from "./AlbumCover"

const apiToken = '<<Copiez le token de Spotify ici>>';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      text: "",
      apiToken: "BQAD5cQzqKe5WKX6XvBXaPPE0cBXXZANsP8Dvj2MCpT9WtJw-PrOLeOeNTzSxoJaQ-9icKpyM4C-P0prKQPD7cT2EXeKLpKvsUYUn68TxKAHuYo7dnlwUF4GuhnLM4SNDRtMxpWEmb8dVg3I9WVmhlGiBOTjzsY",
      songsLoaded: false,
      currentTrack: "",
      tracks: [],
      randomTracks: [],
      timeout: null
    }
  }

  componentDidMount() {

    fetch('https://api.spotify.com/v1/playlists/1wCB2uVwBCIbJA9rar5B77/tracks', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + this.state.apiToken,
      },
    })
      .then(response => response.json())
      .then((data) => {
        console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", data);
        let tracks = data.items;
        let random = getRandomNumber(tracks.length - 1);
        let random1 = getRandomNumber(tracks.length - 1)
        let random2 = getRandomNumber(tracks.length - 1)
        let currentTrack = tracks[random].track;
        let secondTrack = tracks[random1].track;
        let thirdTrack = tracks[random2].track;
        let randomTracks = [currentTrack, secondTrack, thirdTrack];
        let shuffledArray = shuffleArray(randomTracks)
        this.setState({ songsLoaded: true, currentTrack, tracks, shuffledArray })
      })
  }

  getRandomTracks = () => {
    let { tracks } = this.state
    if (tracks.length > 0) {
      let random = getRandomNumber(tracks.length - 1);
      let random1 = getRandomNumber(tracks.length - 1)
      let random2 = getRandomNumber(tracks.length - 1)
      let currentTrack = tracks[random].track;
      let secondTrack = tracks[random1].track;
      let thirdTrack = tracks[random2].track;
      let randomTracks = [currentTrack, secondTrack, thirdTrack];
      let shuffledArray = shuffleArray(randomTracks)
      this.setState({ shuffledArray, currentTrack })
    }
  }

  timer = () => {
    const timeout = setTimeout(this.getRandomTracks, 3000);
    this.setState({ timeout })
  }

  checkAnswer(id) {
    if (id === this.state.currentTrack.id) {
      clearTimeout(this.state.timeout);
      swal('Bravo', 'Sous-titre', 'success').then(() => { this.getRandomTracks(); this.timer() }
      )

    } else {
      swal('Alerte !!', 'Ceci est une alerte', 'error')
    }
  }

  render() {
    let { songsLoaded, currentTrack, tracks, shuffledArray, text } = this.state;
    return (
      <div className="App">
        {songsLoaded ? <>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Bienvenue sur le Blindtest</h1>
          </header>
          <div className="App-images">
            <div >
              {shuffledArray.map((item) => <Button key={item.id} onClick={() => this.checkAnswer(item.id)}>{item.name}</Button>
              )}
            </div>
            <AlbumCover currentTrack={currentTrack} />
            <Sound url={currentTrack.preview_url} playStatus={Sound.status.PLAYING} />
            <p>{text} {tracks.length} chansons</p>
            <p>{currentTrack.name}</p>
          </div>
          <div className="App-buttons">
          </div>
        </> : <img src={logo} className="App-logo" alt="logo" />}

      </div>
    );
  }
}

export default App;
