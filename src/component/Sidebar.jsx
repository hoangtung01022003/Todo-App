import React, { useState } from "react";
import "./Sidebar.css";
import PropTypes from "prop-types";
import { CATEGORY_ITEMS } from "../constants";
const Sidebar = (props) => {
  const data = props.todoItem;
  const [name, setName] = useState(data.name);
  const [isImportan, setIsImportan] = useState(data.isImportan);
  const [isCompleted, setIsCompleted] = useState(data.isCompleted);
  const [category, setCategory] = useState(data.category);

  const handleSave = () => {
    const newTodo = { ...data, name, isImportan, isCompleted, category };
    props.handleTodoItemChange(newTodo);
    props.setShowSidebar(false);
  };

  return (
    <div className="sidebar">
      <form className="sb-form">
        <div className="sb-form-field">
          <label htmlFor="sb-name">Todo Name</label>
          <input
            id="sb-name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="sb-form-field">
          <label htmlFor="sb-important">Is importan?</label>
          <input
            id="sb-important"
            name="isImportan"
            type="checkbox"
            checked={isImportan}
            onChange={() => {
              setIsImportan(!isImportan);
            }}
          />
        </div>
        <div className="sb-form-field">
          <label htmlFor="sb-completed">Is completed?</label>
          <input
            id="sb-completed"
            name="name"
            type="checkbox"
            checked={isCompleted}
            onChange={() => {
              setIsCompleted(!isCompleted);
            }}
          />
        </div>
        <div className="sb-form-field">
          <label htmlFor="sb-category">Category</label>
          <select
            id="sb-category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            {CATEGORY_ITEMS.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              );
            })}
          </select>
        </div>
      </form>
      <div className="sb-footer">
        <button onClick={handleSave}>Save</button>
        <button onClick={() => props.setShowSidebar(false)}>Cancel</button>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  setShowSidebar: PropTypes.func,
  todoItem: PropTypes.shape({
    name: PropTypes.string,
    isImportan: PropTypes.bool,
    isCompleted: PropTypes.bool,
    category: PropTypes.string,
    setCategory: PropTypes.func,
  }),
  handleTodoItemChange: PropTypes.func,
};

export default Sidebar;
