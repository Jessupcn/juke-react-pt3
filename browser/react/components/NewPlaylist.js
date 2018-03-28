import React from 'react';
import axios from 'axios';

export default class NewPlaylist extends React.Component{
  constructor(props){
    super(props)
    console.log(props)
    this.state = {
      inputValue: "",
      submittable: false,
      hasChanged: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange (syntheticEvent) {
    const input = syntheticEvent.target.value
    if (input.length > 0 && input.length < 16 ){
      this.setState({
        hasChanged: true,
        submittable: true,
        inputValue: syntheticEvent.target.value
      })

    } else {
      this.setState({
        submittable: false,
        inputValue: syntheticEvent.target.value
      })
    }
  }

  handleSubmit(submitEvent){
    submitEvent.preventDefault();
    //axios request here
    const name = this.state.inputValue
    this.props.newPlaylistPost(name);

    //do this last
    this.setState({submittable: false, inputValue: "", hasChanged: false})
  }

  render(){

    return (
      <div className="well">
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>New Playlist</legend>
            <div className="form-group">
            <label className="col-xs-2 control-label">Name</label>
              <div className="col-xs-10">
                <input onChange={this.handleChange} value={this.state.inputValue} className="form-control" type="text"/>
                {
                  !this.state.hasChanged || this.state.submittable ? console.log('yayyy') : <div className="alert alert-warning">Please enter a name</div>
                }
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button disabled={!this.state.submittable} type="submit" className="btn btn-success">Create Playlist</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    )
  }
}
