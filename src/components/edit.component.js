import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeTopicName = this.onChangeTopicName.bind(this);
    this.onChangeTodolName = this.onChangeTodolName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      Topic_name: '',
      Todol_name: '',
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/todo/edit/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          Topic_name: response.data.Topic_name,
          Todol_name: response.data.Todol_name,
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onChangeTopicName(e) {
    this.setState({
      Topic_name: e.target.value,
    });
  }
  onChangeTodolName(e) {
    this.setState({
      Todol_name: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      Topic_name: this.state.Topic_name,
      Todol_name: this.state.Todol_name,
    };
    axios
      .post(
        'http://localhost:5000/todo/update/' + this.props.match.params.id,
        obj
      )
      .then(res => console.log(res.data));

    console.log('props ;;', this.props);
    this.props.history.goBack('/index');
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3 align="center">Update </h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Topic: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.Topic_name}
              onChange={this.onChangeTopicName}
            />
          </div>
          <div className="form-group">
            <label>Todolist </label>
            <input
              type="text"
              className="form-control"
              value={this.state.Todol_name}
              onChange={this.onChangeTodolName}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Update Todolist"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
