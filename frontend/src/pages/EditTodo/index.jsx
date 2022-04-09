/** @format */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { getSingleTodo,updateTodos } from '../../services/todo';
import 'react-datepicker/dist/react-datepicker.css';

class EditTodos extends Component {
  state = {
    username: '',
    description: '',
    duration: 0,
    date: new Date()
  };

  componentDidMount() {
    this.fetchTodos();   
   }
    
  fetchTodos = async () => {
    try {
      
      const response = await getSingleTodo(this.props.match.params.id);

     this.setState({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
        });
    
    } catch(e) {
      // error handling
    }
  }

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  onChangeDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };
  onChangeDuration = (e) => {
    this.setState({
      duration: e.target.value,
    });
  };
  onChangeDate = (date) => {
    this.setState({
      date: date,
    });
  };
  onSubmit = async (e) => {
    e.preventDefault();

    const todo = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };
    
    try{
      const response = await updateTodos(this.props.match.params.id,todo);
      console.log(response.data);
    
    } catch(e) {
      // error handling
    }
  
    this.setState({ description: '' });
    this.setState({ duration: '' });
    this.setState({ date: new Date() });
    window.location = "/";
  };

  render() {
    return (
      <div>
        <h3>Edit Exercise Log</h3>
        <br></br>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username :</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <label>Description :</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration (In minutes) :</label>
            <input
              type="number"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>Date :</label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <br></br>
          <div className="form-group">
            <input
              type="submit"
              value="Edit Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
    
EditTodos.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.any
     
    })
  }),
}
export default EditTodos;
