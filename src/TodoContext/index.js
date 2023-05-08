import React from 'react'
import {useLocalStorage} from './useLocalStorage.js'

const TodoContext = React.createContext();

function TodoProvider(props){

      //const [patito, savePatito] = useLocalStorage('PATITO_V2', 'Fercho');
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error
  } = useLocalStorage('TODOS_V1', []);
  
  
  const [searchValue, setsearchValue] = React.useState('');

  const [openModal,setOpenModal] = React.useState(false);

  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];

  if(!searchValue.length >= 1){
    searchedTodos = todos;
  }
  else{
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }

  const addTodo = (text) => {
    const newTodos = [...todos];
    newTodos.push({
      completed: false,
      text
    });
    // todos[todoIndex] = {
    //   text: todos[todoIndex].text,
    //   completed: true,
    //};
    saveTodos(newTodos);
  };

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    // todos[todoIndex] = {
    //   text: todos[todoIndex].text,
    //   completed: true,
    //};
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  // console.log('antes');

  // React.useEffect(() => {
  //   console.log('use effect');
  // }, [totalTodos]);

  // console.log('luego');

    return(
        <TodoContext.Provider value={{
            loading,
            error,
            totalTodos,
            completedTodos,
      
            searchValue,
            setsearchValue,
      
            searchedTodos,
      
            completeTodo,
            deleteTodo,
            addTodo,

            openModal,
            setOpenModal
        }}>
            {props.children}
        </TodoContext.Provider>
    );
}


export {TodoContext, TodoProvider};