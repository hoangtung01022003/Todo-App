import PropTypes from "prop-types";
import React, { createContext, useContext, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [todoList, setTodoList] = React.useState([
    {
      id: "1",
      name: "Toi di hoc",
      isImportan: true,
      isCompleted: true,
      isDeleted: false,
      category: "personal",
    },
    {
      id: "2",
      name: "Toi di choi",
      isImportan: true,
      isCompleted: false,
      isDeleted: false,
      category: "personal",
    },
    {
      id: "3",
      name: "Toi di lam",
      isImportan: false,
      isCompleted: false,
      isDeleted: false,
      category: "travel",
    },
  ]);

  const [selectedFilterId, setSelectedFilterId] = useState("all");
  const [activeTodoItemId, setActiveTodoItemId] = useState();
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const handleTodoIteamClick = (todoId) => {
    setShowSidebar(true);
    setActiveTodoItemId(todoId);
  };

  const handleCompletedCheckboxChange = (todoId) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  const handleTodoItemChange = (newTodo) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === newTodo.id) {
        return newTodo;
      }
      return todo;
    });
    setTodoList(newTodoList);
  };
  return (
    <AppContext.Provider
      value={{
        selectedCategoryId,
        setSelectedCategoryId,
        searchText,
        setSearchText,
        showSidebar,
        setShowSidebar,
        activeTodoItemId,
        setActiveTodoItemId,
        selectedFilterId,
        setSelectedFilterId,
        todoList,
        setTodoList,
        handleTodoIteamClick,
        handleCompletedCheckboxChange,
        handleTodoItemChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.element,
  todoList: PropTypes.array,
  setTodoList: PropTypes.func,
};
export default AppProvider;

export const useAppContext = () => {
  return useContext(AppContext);
};
