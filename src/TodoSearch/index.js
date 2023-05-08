import React from 'react'
import './TodoSearch.css';
import { TodoContext } from '../TodoContext';



function TodoSearch() {

  const {searchValue, setsearchValue} = React.useContext(TodoContext);

  const onSearchValueChange = (event) =>{
    console.log(event.target.value);
    setsearchValue(event.target.value);
  };

  return (
    <input 
    className="TodoSearch" 
    placeholder='Cebolla'
    value={searchValue}
    onChange={onSearchValueChange}
    />
  );
}

export {TodoSearch}