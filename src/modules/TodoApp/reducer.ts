import { handleActions } from 'redux-actions';
import * as ActionTypes from './constants';

const initialState: TodoApp.State = {
    filter: ActionTypes.SHOW_ALL,
    items: [
        {
            id: Math.random().toString(),
            text: 'Temp Todo',
            completed: false,
        },
    ],
};

export default handleActions<TodoApp.State, TodoApp.Item>(
    {
        [ActionTypes.ADD_TODO]: (state, action) => {
            return {
                ...state,
                items: [
                    ...state.items,
                    {
                        id: Math.random().toString(),
                        text: action.payload.text,
                        completed: false,
                    },
                ],
            };
        },

        [ActionTypes.DELETE_TODO]: (state, action) => {
            return {
                ...state,
                items: [],
            };
        },

        [ActionTypes.EDIT_TODO]: (state, action) => {
            return {
                ...state,
                items: state.items.map((item) => {
                    return item.id === action.payload.id
                        ? {
                              ...item,
                              text: action.payload.text,
                          }
                        : {
                              ...item,
                          };
                }),
            };
        },

        [ActionTypes.COMPLETE_TODO]: (state, action) => {
            return {
                ...state,
                items: state.items.map(
                    (item) =>
                        item.id === action.payload.id
                            ? {
                                  ...item,
                                  completed: !item.completed,
                              }
                            : {
                                  ...item,
                              }
                ),
            };
        },

        [ActionTypes.COMPLETE_ALL]: (state, action) => {
            const allAreMarked = state.items.every(
                (todo: any) => todo.completed
            );
            return {
                ...state,
                items: state.items.map((item) => ({
                    ...item,
                    completed: !allAreMarked,
                })),
            };
        },

        [ActionTypes.CLEAR_COMPLETED]: (state, action) => {
            return {
                ...state,
                items: state.items.filter((item) => !item.completed),
            };
        },
    },
    initialState
);
