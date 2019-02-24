import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import { throws } from 'assert';
// const jwt = require("jsonwebtoken")
// import jwt_decode from 'jwt-decode'
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { todo: [], users: [] };
  }

  // async componentDidMount(){
  // var decoded = jwt.verify(req.headers['authorization'].split(" ")[1], process.env.SECRET_KEY)
  //   const resp = await axios.get('http://localhost:5000/todo/')
  //   this.setState({ todo: resp.data});

  // }
  async componentDidMount() {
    const jwtToken = localStorage.getItem('usertoken');
    const resp = await axios.get('http://localhost:5000/todos', {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    this.setState({ todo: resp.data });
  }
  // componentDidMount() {
  //   // console.log(this.props.match.params.id)
  //   axios.get('http://localhost:5000/todo/'+this.props.match.params.id)
  //       .then(response => {
  //           this.setState({
  //             users: response.data,
  //             });
  //       })
  //       .catch(function (error) {
  //           console.log(error);
  //       })
  // }

  delete = id => {
    console.log('log :: ', this.props);
    axios({
      url: `http://localhost:5000/todos/delete/${id}`,
      method: 'delete',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('usertoken')}`,
      },
    })
      .then(console.log('Deleted'))
      .catch(err => console.log(err));
  };

  tabRow() {
    return;
  }

  render() {
    return (
      <div>
        <h3 align="center">Todo List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Topic</th>
              <th>TodoList</th>

              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.todo.map((object, i) => (
              <TableRow delete={this.delete} obj={object} key={i} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
