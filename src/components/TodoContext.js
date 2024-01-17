

import React, { createContext, useContext, useReducer, useEffect } from 'react';

const TodoContext = createContext();

const initialState = {
  tasks: [],
};

const ADD_TASK = 'ADD_TASK';
const REMOVE_TASK = 'REMOVE_TASK';
const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE';
const SET_TASKS = 'SET_TASKS';

function todoReducer(state, action) {
  switch (action.type) {
    case ADD_TASK:
      return { tasks: [...state.tasks, action.payload] };
    case REMOVE_TASK:
      return { tasks: state.tasks.filter(task => task.id !== action.payload) };
    case TOGGLE_COMPLETE:
      return {
        tasks: state.tasks.map(task =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        ),
      };
    case SET_TASKS:
      return { tasks: action.payload };
    default:
      return state;
  }
}

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      dispatch({ type: SET_TASKS, payload: storedTasks });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  const addTask = task => {
    dispatch({ type: ADD_TASK, payload: task });
  };

  const removeTask = taskId => {
    dispatch({ type: REMOVE_TASK, payload: taskId });
  };

  const toggleComplete = taskId => {
    dispatch({ type: TOGGLE_COMPLETE, payload: taskId });
  };

  return (
    <TodoContext.Provider
      value={{
        tasks: state.tasks,
        addTask,
        removeTask,
        toggleComplete,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  return useContext(TodoContext);
}
