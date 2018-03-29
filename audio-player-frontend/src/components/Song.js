import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Song extends Component {
    render() {
        let transportStyle= {
            backgroundColor: "#00003f",
        };
        let iconStyle= {
            color: "#fe00ea",
        };
        let cardTitleStyle = {
            color: "#00003f",
            fontFamily: "Permanent Marker",
        };
        let cardStyle = {
            maxWidth: "18rem",
            minHeight: "450px",
            textAlign: "center",
            backgroundColor: "#fe00ea"
        };
        let cardBottom = {
            position: "absolute",
            bottom: "0",
            marginTop: "5px",    
        };
        return (
            <div className="card col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-3 mr-3" style={cardStyle}>
                <img className="card-img-top" src={this.props.artwork} alt="No Artwork Available"/>
                <div style={cardBottom} className="card-body">
                    <Link to={"/" + this.props.title} onClick={() => this.props.songDetails(this.props.index)}>
                        <h5 style={cardTitleStyle} className="card-title">{this.props.title}</h5>
                    </Link>
                    <button type="button"
                            style={transportStyle} 
                            className="btn btn-outline" 
                            onClick={() => this.props.songListPlay(this.props.index)}>
                            <i style={iconStyle} className="fas fa-play"></i>
                    </button>
                </div>
            </div>
            
        );
    };
};

export default Song;