import React, {Component} from 'react';
import Song from './Song';

class SongsList extends Component {
    render() {
        let headerTextStyle = {
            color: "#ff0178",
            fontFamily: 'Monoton',
        };
        let songArray= this.props.songs;
        let songListJSX;
        songListJSX= songArray.map((song, i) => {
            return <Song source={song.source}
                         title={song.title}
                         description={song.description}
                         id={song.id}
                         index={song.index}
                         artwork={song.artwork}
                         play={this.props.play}
                         song={song}
                         songListPlay={this.props.songListPlay}
                         songDetails={this.props.songDetails}
                         key={i}
                         />
        });
        return (
            <div>
                <h1 style={headerTextStyle}>Song List Page</h1>
                <div className="row">{songListJSX}</div>
            </div>
        );
    };
};

export default SongsList;