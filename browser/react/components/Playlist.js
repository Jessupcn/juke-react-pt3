import React from 'react';
import axios from 'axios';
import Songs from './Songs';

export default class Playlist extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      playlist: {}
    }
    this.getter = this.getter.bind(this)
  }

  getter(playlistId){
    axios.get(`/api/playlists/${playlistId}`)
      .then(res => res.data)
      .then(playlist => this.setState({
        playlist
      })
    );
  }
  componentDidMount () {
    const playlistId = this.props.match.params.playlistId;
    this.getter(playlistId);
  }

componentWillReceiveProps(nextProps){
  const playlistId = this.props.match.params.playlistId;
  const nextPlaylistId = nextProps.match.params.playlistId;

  playlistId !== nextPlaylistId ? this.getter(nextPlaylistId) : null
}

  render(){
    const playlist = this.state.playlist
    return (
      <div>
        <h3>{ playlist.name }</h3>
        <Songs songs={playlist.songs} /> {/** Hooray for reusability! */}
        { playlist.songs && !playlist.songs.length && <small>No songs.</small> }
        <hr />
      </div>
    )
  }

}