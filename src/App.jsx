import "./App.css";
import FilterPanel from "./component/FilterPanel";
import Sidebar from "./component/Sidebar";
import TodoItem from "./component/TodoItem";
import React, { useMemo, useRef } from "react";
import { useAppContext } from "./context/AppProvider";
function App() {
  //hook

  const {
    selectedCategoryId,
    todoList,
    setTodoList,
    searchText,
    showSidebar,
    setShowSidebar,
    activeTodoItemId,
    selectedFilterId,
    handleTodoIteamClick,
    handleCompletedCheckboxChange,
    handleTodoItemChange,
  } = useAppContext();
  const activeTodoItem = todoList.find((todo) => todo.id === activeTodoItemId);

  const filterTodos = useMemo(() => {
    return todoList.filter((todo) => {
      if (!todo.name.includes(searchText)) {
        return false;
      }

      if (selectedCategoryId && todo.category !== selectedCategoryId) {
        return false;
      }
      switch (selectedFilterId) {
        case "all":
          return true;
        case "importan":
          return todo.isImportan;
        case "completed":
          return todo.isCompleted;
        case "deleted":
          return todo.isDeleted;
        default:
          return true;
      }
    });
  }, [selectedFilterId, todoList, searchText, selectedCategoryId]); // Chỉ update khi mà các biến này thay đổi

  const inputRef = useRef();
  console.log(inputRef);

  return (
    <div className="container">
      <FilterPanel />
      <div className="main-container">
        <input
          ref={inputRef}
          type="text"
          name="add-new-task"
          placeholder="Add new task"
          className="task-input"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const value = e.target.value; //lay gia tri da nhap
              console.log(value);
              setTodoList([
                ...todoList,
                {
                  id: crypto.randomUUID(),
                  name: value,
                  isCompleted: false,
                  isImportan: false,
                  isDeleted: false,
                  category: "personal",
                }, //...todolist : luu lai gia tri cu, tiep do la gia tri moi
              ]);
              inputRef.current.value = "";
            }
          }}
        />
        <div>
          {filterTodos.map((todo) => {
            return (
              <TodoItem
                id={todo.id}
                name={todo.name}
                key={todo.id}
                isImportan={todo.isImportan}
                isCompleted={todo.isCompleted}
                isDeleted={todo.isDeleted}
                category={todo.category}
                handleCompletedCheckboxChange={handleCompletedCheckboxChange}
                handleTodoIteamClick={handleTodoIteamClick}
              />
            );
          })}
        </div>
        {showSidebar && (
          <Sidebar
            key={activeTodoItemId}
            todoItem={activeTodoItem}
            handleTodoItemChange={handleTodoItemChange}
            setShowSidebar={setShowSidebar}
          />
        )}
      </div>
    </div>
  );
}

export default App;
