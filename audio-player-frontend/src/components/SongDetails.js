import React, {Component} from 'react';

class SongDetails extends Component {
    render() {
        let detailsStyle = {
            textAlign: "center",
            height: "100vh",
            marginBottom: "50%"
        };
        let transportStyle= {
            backgroundColor:"#fe00ea",
        };
        let iconStyle= {
            color: "#00003f",
        };
        let headerTextStyle = {
            color: "#ff0178",
            fontFamily: 'Monoton',
        };
        let descriptionStyle = {
            color: "#fe00ea",
            fontFamily: "Permanent Marker",
        };
        return (
            <div style={detailsStyle}>
                <h1 style={headerTextStyle}>{this.props.song.title}</h1>
                <p style={descriptionStyle}>{this.props.song.description}</p>
                <img src={this.props.song.artwork} className="img-fluid rounded" alt="No Artwork Available"/>
                <button style={transportStyle} 
                        type="button" 
                        className="btn btn-outline ml-1" 
                        onClick={() => this.props.songDetailsPlay(this.props.song.index)}>
                        <i style={iconStyle} className="fas fa-play"></i>
                </button>
            </div>
        );
    };
};

export default SongDetails;