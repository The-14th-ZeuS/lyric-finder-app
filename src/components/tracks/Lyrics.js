import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';

class Lyrics extends Component {
    state = {
        track: {},
        lyrics: {}
    };

    componentDidMount(){
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
        .then(res => {
            //console.log(res.data);
            this.setState({
                lyrics: res.data.message.body.lyrics
            })
            return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res => {
                //console.log(res.data);
                this.setState({
                    track: res.data.message.body.track
                })
        })
        .catch(err => console.log(err))
    });
    }
    
    render() {
        const { track, lyrics } = this.state;
        //console.log(track);
        if(track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(lyrics).length === 0 ){
                return <Spinner />;
        } else {
                return (
                    <React.Fragment>
                        <Link to="/" className="btn btn-dark btn-small mb-4">Back</Link>
                        <h5 className="card">
                            <div className="card-header">
                                {track.track_name} by <span className="text-secondary">{track.artist_name}</span>
                            </div>
                        </h5>
                        <div className="card-body">
                            {lyrics.lyrics_body}
                        </div>
                        <ul className="list-group mt3">
                        <li className="list-group-item">
                            <strong>Album ID</strong>:{" "}{track.album_id}
                        </li>
                        <li className="list-group-item">
                            <strong>Song Genre</strong>:{' '}
                            {track.primary_genres.music_genre_list.length !== 0
                                ? track.primary_genres.music_genre_list[0].music_genre
                                    .music_genre_name
                                : 'N/A'}
                        </li>
                        <li className="list-group-item">
                        <strong>Explicit Words</strong>:{" "}{track.explicit === 0 ? "NO" : "YES"}
                        </li>
                        <li className="list-group-item">
                        <strong>Number of favourites</strong>:{" "}{track.num_favourite}
                        </li>
                        </ul>
                    </React.Fragment>
                );
        }
    }
}

export default Lyrics;