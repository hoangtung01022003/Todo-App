// import React from "react";

import PropTypes from "prop-types";
import React from "react";

const TodoItem = (props) => {
  console.log(props);
  return (
    <div
      className="todo-item"
      onClick={() => props.handleTodoIteamClick(props.id)}
    >
      <div style={{ display: "flex", gap: 4 }}>
        <input
          type="checkbox"
          checked={props.isCompleted}
          onChange={() => {
            props.handleCompletedCheckboxChange(props.id);
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
        <p className="todo-item-text">{props.name}</p>
      </div>
      {props.isImportan && <p>⭐</p>}
    </div>
  );
};

TodoItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  isCompleted: PropTypes.bool,
  isImportan: PropTypes.bool,
  handleClick: PropTypes.func,
  handleTodoIteamClick: PropTypes.func,
  handleCompletedCheckboxChange: PropTypes.func,
};

export default TodoItem;
