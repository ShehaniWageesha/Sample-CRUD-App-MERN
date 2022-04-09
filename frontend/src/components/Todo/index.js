import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { RoutePaths } from '../../routes/route-paths';

const Todo = (props) => (
  <tr>
    <td>{props.todo.username}</td>
    <td>{props.todo.description}</td>
    <td>{props.todo.duration}</td>
    <td>{props.todo.date.substring(0, 10)}</td>
    <td>
      <Link to={`${RoutePaths.edit}${props.todo._id}`} style={{ color:'green' , textDecoration: 'none' , fontWeight: "bold" }}>Edit | </Link>
      <a style={{ textDecoration: 'none' , fontWeight: "bold" , color:'red' }}
        href="#"
        onClick={() => {
          props.deleteTodo(props.todo._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

Todo.propTypes = {
  deleteTodo: PropTypes.func,
  todo: PropTypes.shape({
    _id: PropTypes.any,
    date: PropTypes.shape({
      substring: PropTypes.date
    }),
    description: PropTypes.string,
    duration: PropTypes.string,
    username: PropTypes.string
  })
};
export default Todo;
