import React, { Component } from 'react';

const TableRow = props => {
  return (
    <tr>
      <td>{props.obj.Topic_name}</td>
      <td>{props.obj.Todol_name}</td>

      <td>
        <button
          onClick={props.delete(props.obj._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
