import React, { useMemo } from "react";
import "./CategoryList.css";
import { CATEGORY_ITEMS } from "../constants";
import { useAppContext } from "../context/AppProvider";
import PropTypes from "prop-types";
// import PropTypes from "prop-types";

const CategoryList = () => {
  const { selectedCategoryId, setSelectedCategoryId, todoList } =
    useAppContext();

  const countByCategory = useMemo(() => {
    return todoList.reduce(
      (acc, cur) => ({
        ...acc,
        [cur.category]: acc[cur.category] + 1,
      }),

      { personal: 0, company: 0, travel: 0, idea: 0 }
    );
  }, [todoList]);
  console.log(countByCategory);

  return (
    <div>
      <p>Categories</p>
      <div>
        {CATEGORY_ITEMS.map((category) => {
          return (
            <div
              key={category.id}
              className={`category-item ${
                selectedCategoryId === category.id ? "selected" : ""
              }`}
              onClick={() => setSelectedCategoryId(category.id)}
            >
              <p className="category-name">{category.label}</p>
              <p>{countByCategory[category.id]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

CategoryList.propTypes = {
  // category: PropTypes.string,
  // setCategory: PropTypes.func,
  todoList: PropTypes.array,
  // selectedCategoryId: PropTypes.string,
};

export default CategoryList;
