import React, {Component} from 'react';

class transport extends Component {
    render() {
        let transportStyle= {
            backgroundColor: "#fe00ea",
        };
        return (
            <div>
                <button type="button"
                        style={transportStyle} 
                        className="btn btn-outline ml-2" 
                        onClick={this.props.previousSong} 
                        disabled={this.props.index === 0 ? true: false}>
                        <i className="fas fa-step-backward"></i>
                </button>
                <button type="button"
                        style={transportStyle} 
                        className="btn btn-outline ml-2" 
                        onClick={this.props.pause}
                        disabled={this.props.playing === false ? true: false}>
                        <i className="fas fa-pause"></i>
                </button>       
                <button type="button"
                        style={transportStyle} 
                        className="btn btn-outline ml-2" 
                        onClick={this.props.play}
                        disabled={this.props.playing === true ? true: false}>
                        <i className="fas fa-play"></i>
                </button>
                <button type="button"
                        style={transportStyle} 
                        className="btn btn-outline ml-2" 
                        onClick={this.props.changeSong} 
                        disabled={this.props.index === (this.props.songs.length -1) ? true: false}>
                        <i className="fas fa-step-forward"></i>
                </button>
            </div>
        );
    };
};

export default transport;