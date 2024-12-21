import "./FilterPanel.css";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CategoryList from "./CategoryList";
import { useAppContext } from "../context/AppProvider";
const FILTER_ITEMS = [
  {
    id: "all",
    label: "All",
    iconPath: "./public/inbox.png",
  },
  {
    id: "importan",
    label: "Importan",
    iconPath: "./public/flag.png",
  },
  {
    id: "completed",
    label: "Completed",
    iconPath: "./public/check.png",
  },
  {
    id: "deleted",
    label: "Deleted",
    iconPath: "./public/delete.png",
  },
];
//({ selectedFilterId, setSelectedFilterId }): đây là một distructering
const FilterPanel = () => {
  const { todoList } = useAppContext();
  const { searchText, setSearchText, selectedFilterId, setSelectedFilterId } =
    useAppContext();

  const countByFilterTyper = useMemo(() => {
    return todoList.reduce(
      (acc, cur) => {
        let newAcc = { ...acc };
        if (cur.isCompleted) {
          newAcc = { ...newAcc, completed: newAcc.completed + 1 };
        }
        if (cur.isImportan) {
          newAcc = { ...newAcc, importan: newAcc.importan + 1 };
        }
        if (cur.isDeleted) {
          newAcc = { ...newAcc, deleted: newAcc.deleted + 1 };
        }

        return newAcc;
      },
      { all: todoList.length, importan: 0, completed: 0, deleted: 0 }
    );
  }, [todoList]);

  console.log(countByFilterTyper);

  return (
    <div className="filter-panel">
      <input
        name="search-text"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="filter-container">
        {FILTER_ITEMS.map((filterItem) => {
          return (
            <div
              key={filterItem.id}
              className={`filter-item ${
                filterItem.id === selectedFilterId ? "selected" : ""
              }`}
              onClick={() => setSelectedFilterId(filterItem.id)}
            >
              <div className="filter-name">
                <img src={filterItem.iconPath} />
                <p>{filterItem.label}</p>
              </div>
              <p>{countByFilterTyper[filterItem.id]}</p>
            </div>
          );
        })}
      </div>
      <CategoryList />
    </div>
  );
};

FilterPanel.propTypes = {
  selectedFilterId: PropTypes.string,
  setSelectedFilterId: PropTypes.func,
  todoList: PropTypes.array,
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
};

export default FilterPanel;
