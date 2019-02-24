import React, { Component } from 'react';
import axios from 'axios';
export default class Create extends Component {
  constructor(props) {
      super(props);
      this.onChangeTopicName = this.onChangeTopicName.bind(this);
      this.onChangeTodolName = this.onChangeTodolName.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          Topic_name: '',
          Todol_name: '',
          business_gst_number:''
      }
  }
  onChangeTopicName(e) {
    this.setState({
      Topic_name: e.target.value
    });
  }
  onChangeTodolName(e) {
    this.setState({
      Todol_name: e.target.value
    })  
  }
 
  onSubmit(e) {
    e.preventDefault();
    const obj = {
      Topic_name: this.state.Topic_name,
      Todol_name: this.state.Todol_name,
    };

    const token = window.localStorage.getItem("usertoken")
    console.log("token :" , token)
    
    axios.post('http://localhost:5000/todo/add', obj ,  {
       headers : {
        "Authorization" : `Bearer ${token}`
       }
    }).then(res => console.log(res.data));
    
    this.setState({
      Topic_name: '',
      Todol_name: '',
      
    })
  }
  render() {
      return (
          <div style={{ marginTop: 10 }}>
              <h3>Add New Todolist</h3>
              <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                      <label>Topic:  </label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={this.state.Topic_name}
                        onChange={this.onChangeTopicName}
                        />
                  </div>
                  <div className="form-group">
                      <label>Todolist: </label>
                      <input type="text" 
                        className="form-control"
                        value={this.state.Todol_name}
                        onChange={this.onChangeTodolName}
                        />
                  </div>
                
                  <div className="form-group">
                      <input type="submit" value="Add Todolist" className="btn btn-primary"/>
                  </div>
              </form>
          </div>
      )
  }
}