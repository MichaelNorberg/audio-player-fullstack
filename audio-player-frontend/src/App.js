import React, { Component } from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import SongsList from './components/SongsList';
import SongDetails from './components/SongDetails';
import Transport from './components/Transport';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      playing: false,
      songs: [{source: '', title: '', id: 0, description: '', artwork: '', index: ''}],
      song: [{source: '', title: '', id: 0, description: '', artwork: '', index: ''}],
    };
  };
  // sets song to render on the details page to state
  songDetails = (index) => {
    this.setState({
      song: this.state.songs[index],
    });
  };
  // handles the play button on the details page
  songDetailsPlay = (index) => {
    this.setState({
      index: index,
      playing: true,
    }, ()=>this.refs.audioTag.play());
  };
  //handles the play button on every song cart on the list page
  songListPlay = (index) => {
    this.setState({
      index: index,
      playing: true,
    }, ()=>this.refs.audioTag.play());
  };
  //next four methods are for transport opperation
  play = () => {
    console.log('play is hit');
    this.refs.audioTag.play();
    this.setState({
      playing: true
    });
  };
  pause = () => {
    this.refs.audioTag.pause();
    this.setState({
      playing: false
    });
  };
  changeSong = () => {
    this.setState({
      index: this.state.index + 1
    });
  };
  previousSong = () => {
    this.setState({
      index: this.state.index - 1
    });
  };
  //gets a pre-selected search terms data from the sound cloud api to be displayed only when the app first mounts
  componentDidMount() { 
    axios.get('http://localhost:8080/songs')
        .then((results) => {
            let songs = results.data
            this.setState({
                songs: songs,
            });
        })
        .catch((error) => {
            console.log(error);
        });
  };
  //collects data from the search form
  collectData = (event) => {
    event.preventDefault();
    let searchTerm = {searchTerm: this.refs.search.value.toLowerCase()};
    this.search(searchTerm);
    this.refs.search.value = '';
  };
  //sends search data to the server so the server can make a search request
  search = (searchTerm) => { 
    console.log(searchTerm)
    axios.post('http://localhost:8080/search', searchTerm)
        .then((results) => {
            let songs = results.data
            this.setState({
                songs: songs,
            });
        })
        .catch((error) => {
            console.log(error);
        });
  }; 
  //keeps songs playing if the state of playing is true
  componentDidUpdate() {
    if (this.state.playing){
      this.refs.audioTag.play();
    };
  };
  render() {
    let footerStyle = {
      border: "thin black solid",
      backgroundColor: "#01008e",
      textAlign: "center",
    };
    let songStyle = {
      marginBottom: "50%"
    };
    let headerTextColor = {
      color: "#ff0178",
      fontFamily: 'Monoton',
    };
    let pageBackground = {
      backgroundColor: "#00003f",
      height: "100%"
    };
    let navStyle = {
      backgroundColor: "#01008e",
    };
    let searchStyle = {
      backgroundColor: "#fe00ea",
    };
    let brandStyle = {
      fontFamily: 'Monoton',
      color: "#ff0178"
    };
    return (
      <div style={pageBackground} className="App">
        <nav style={navStyle} className="navbar navbar-expand-lg">
          <Link style={brandStyle} className="navbar-brand" to="/">Bootleg Audio</Link>
          <button className="navbar-toggler" 
                  type="button" 
                  data-toggle="collapse" 
                  data-target="#navbarNavAltMarkup" 
                  aria-controls="navbarNavAltMarkup" 
                  aria-expanded="false" 
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link style={headerTextColor} className="nav-item nav-link" to="/">Songs List </Link>
              <Link style={headerTextColor} className="nav-item nav-link" to="/:songId">Song Details</Link> 
            </div>
          </div>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="text" ref="search" placeholder="Search" aria-label="Search"/>
            <button style={searchStyle} onClick={this.collectData} className="btn btn-outline my-2 my-sm-0" type="submit">Search</button>
          </form>
        </nav>
        <audio id="myAudio" ref="audioTag"src={this.state.songs[this.state.index].source}></audio>
        <div style={songStyle} className="container">
          <Switch>
            <Route exact path="/" render={(props)=><SongsList songs={this.state.songs} 
                                                              match={props.match} 
                                                              songListPlay={this.songListPlay}
                                                              songDetails={this.songDetails}/>}/>
            <Route path='/:songId'render={(props)=><SongDetails songs={this.state.songs} 
                                                                song={this.state.song}
                                                                match={props.match}
                                                                songDetailsPlay={this.songDetailsPlay}/>}/>
                                                                
          </Switch>
        </div>
        <footer style={footerStyle} className="fixed-bottom">
        <h2 style={headerTextColor}>{this.state.songs[this.state.index].title}</h2>
          <Transport songs={this.state.songs}
                     playing={this.state.playing} 
                     previousSong={this.previousSong} 
                     pause={this.pause} play={this.play} 
                     changeSong={this.changeSong} 
                     index={this.state.index}/>
        </footer>
      </div>
    );
  };
};

export default App;
